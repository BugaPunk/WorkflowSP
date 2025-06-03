import { useState } from "preact/hooks";
import { Project, ProjectRole, ProjectStatus } from "../models/project.ts";
import ProjectMembersList from "../components/Projects/ProjectMembersList.tsx";
import EditProjectModal from "../components/ProjectModals/EditProjectModal.tsx";
import AssignProjectModal from "../components/ProjectModals/AssignProjectModal.tsx";

interface ProjectMember {
  id: number;
  userId: number;
  projectId: number;
  role: ProjectRole;
  username?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectDetailIslandProps {
  project: Project;
  members: ProjectMember[];
  isAdmin: boolean;
}

export default function ProjectDetailIsland({
  project,
  members,
  isAdmin,
}: ProjectDetailIslandProps) {
  // Estados para modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Función para obtener la etiqueta de estado
  const getStatusLabel = (status: string) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return { text: "Activo", class: "bg-green-100 text-green-800" };
      case ProjectStatus.IN_PROGRESS:
        return { text: "En progreso", class: "bg-yellow-100 text-yellow-800" };
      case ProjectStatus.COMPLETED:
        return { text: "Completado", class: "bg-blue-100 text-blue-800" };
      default:
        return { text: "Desconocido", class: "bg-gray-100 text-gray-800" };
    }
  };

  // Función para manejar la edición de un proyecto
  const handleProjectEdited = () => {
    setShowEditModal(false);
    // En una implementación real, aquí recargaríamos los datos del proyecto
  };

  // Función para manejar la asignación de usuarios a un proyecto
  const handleProjectAssigned = () => {
    setShowAssignModal(false);
    // En una implementación real, aquí recargaríamos los miembros del proyecto
  };

  return (
    <div class="space-y-6">
      {/* Cabecera del proyecto */}
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{project.name}</h1>
            <div class="flex items-center mt-2">
              <span class={`${getStatusLabel(project.status as string).class} text-xs px-2 py-1 rounded-full`}>
                {getStatusLabel(project.status as string).text}
              </span>
              <span class="text-sm text-gray-500 ml-4">
                Creado: {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button
              type="button"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowEditModal(true)}
            >
              Editar Proyecto
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => setShowAssignModal(true)}
            >
              Asignar Usuarios
            </button>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Descripción</h2>
          <p class="text-gray-600">{project.description}</p>
        </div>
      </div>
      
      {/* Lista de miembros */}
      <ProjectMembersList
        members={members}
        projectId={project.id}
        isAdmin={isAdmin}
      />

      {/* Modales */}
      <EditProjectModal
        show={showEditModal}
        project={project}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleProjectEdited}
      />

      <AssignProjectModal
        show={showAssignModal}
        project={project}
        onClose={() => setShowAssignModal(false)}
        onSuccess={handleProjectAssigned}
      />
    </div>
  );
}
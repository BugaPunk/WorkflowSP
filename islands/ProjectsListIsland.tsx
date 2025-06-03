import { useState } from "preact/hooks";
import { Project, ProjectStatus } from "../models/project.ts";
import CreateProjectModal from "../components/ProjectModals/CreateProjectModal.tsx";
import EditProjectModal from "../components/ProjectModals/EditProjectModal.tsx";
import AssignProjectModal from "../components/ProjectModals/AssignProjectModal.tsx";

interface ProjectsListIslandProps {
  initialProjects: Project[];
  userId: number;
}

export default function ProjectsListIsland({ initialProjects, userId }: ProjectsListIslandProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Función para obtener el color de fondo según el estado
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return "bg-blue-600";
      case ProjectStatus.IN_PROGRESS:
        return "bg-purple-600";
      case ProjectStatus.COMPLETED:
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

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

  // Función para recargar proyectos desde la API
  const reloadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const updatedProjects = await response.json();
        setProjects(updatedProjects.map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt)
        })));
      }
    } catch (error) {
      console.error('Error al recargar proyectos:', error);
    }
  };

  // Función para manejar la creación de un proyecto
  const handleProjectCreated = async () => {
    setShowCreateModal(false);
    // Recargar la lista de proyectos
    await reloadProjects();
  };

  // Función para manejar la edición de un proyecto
  const handleProjectEdited = async () => {
    setShowEditModal(false);
    setSelectedProject(null);
    // Recargar la lista de proyectos
    await reloadProjects();
  };

  // Función para manejar la asignación de usuarios a un proyecto
  const handleProjectAssigned = async () => {
    setShowAssignModal(false);
    setSelectedProject(null);
    // Recargar la lista de proyectos para reflejar cambios
    await reloadProjects();
  };

  return (
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Proyectos</h1>
        <button 
          type="button" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          Nuevo Proyecto
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} class="border border-gray-200 rounded-lg overflow-hidden">
            <div class={`${getStatusBgColor(project.status as string)} text-white p-4`}>
              <h3 class="text-lg font-semibold">{project.name}</h3>
              <p class="text-sm text-blue-100">
                Creado: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div class="p-4">
              <p class="text-gray-600 mb-4">{project.description}</p>
              <div class="flex justify-between items-center">
                <span class={`${getStatusLabel(project.status as string).class} text-xs px-2 py-1 rounded-full`}>
                  {getStatusLabel(project.status as string).text}
                </span>
                <div class="space-x-2">
                  <a 
                    href={`/dashboard/projects/${project.id}`}
                    class="text-green-600 hover:text-green-800"
                  >
                    Ver detalles
                  </a>
                  <button 
                    type="button" 
                    class="text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowEditModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    class="text-purple-600 hover:text-purple-800"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowAssignModal(true);
                    }}
                  >
                    Asignar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      <CreateProjectModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleProjectCreated}
        currentUserId={userId}
      />

      <EditProjectModal
        show={showEditModal}
        project={selectedProject}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProject(null);
        }}
        onSuccess={handleProjectEdited}
      />

      <AssignProjectModal
        show={showAssignModal}
        project={selectedProject}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedProject(null);
        }}
        onSuccess={handleProjectAssigned}
      />
    </div>
  );
}
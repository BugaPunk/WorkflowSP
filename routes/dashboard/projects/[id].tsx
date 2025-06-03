import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DashboardLayout } from "../../../components/DashboardLayout.tsx";
import { getSessionData, requireAuth, formatRole } from "../../../utils/auth.ts";
import { ProjectRole, ProjectStatus } from "../../../models/project.ts";
import ProjectDetailIsland from "../../../islands/ProjectDetailIsland.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    // Verificar si el usuario está autenticado
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return redirectResponse;
    }

    // Obtener los datos del usuario de la sesión
    const sessionData = getSessionData(req);

    // Si no hay datos de sesión, usar datos de demostración
    const user = sessionData ? {
      ...sessionData,
      // Formatear el rol para mostrarlo de manera más amigable
      formattedRole: formatRole(sessionData.role)
    } : {
      name: "Usuario Demo",
      email: "usuario@example.com",
      role: "team_developer",
      formattedRole: "Team Developer"
    };

    // Obtener el ID del proyecto
    const projectId = Number(ctx.params.id);
    
    // En una implementación real, obtendríamos el proyecto de la base de datos
    // Por ahora, usamos datos de ejemplo
    const project = {
      id: projectId,
      name: "Proyecto Scrum",
      description: "Implementación de metodología Scrum para gestión de proyectos académicos.",
      ownerId: 1,
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-05-15"),
      status: ProjectStatus.ACTIVE
    };

    // Miembros del proyecto (en una implementación real, esto vendría de la base de datos)
    const members = [
      {
        id: 1,
        userId: 1,
        projectId: projectId,
        role: ProjectRole.PRODUCT_OWNER,
        username: "Juan Pérez",
        email: "juan@example.com",
        createdAt: new Date("2023-05-15"),
        updatedAt: new Date("2023-05-15")
      },
      {
        id: 2,
        userId: 2,
        projectId: projectId,
        role: ProjectRole.SCRUM_MASTER,
        username: "Ana López",
        email: "ana@example.com",
        createdAt: new Date("2023-05-16"),
        updatedAt: new Date("2023-05-16")
      },
      {
        id: 3,
        userId: 3,
        projectId: projectId,
        role: ProjectRole.TEAM_MEMBER,
        username: "Carlos Rodríguez",
        email: "carlos@example.com",
        createdAt: new Date("2023-05-17"),
        updatedAt: new Date("2023-05-17")
      }
    ];

    return ctx.render({ user, project, members });
  },
};

export default function ProjectDetail({ data }: PageProps) {
  const { user, project, members } = data;
  
  // Verificar si el usuario es administrador
  const isAdmin = user.role === "admin" || user.role === "scrum_master";

  return (
    <>
      <Head>
        <title>{project.name} - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <ProjectDetailIsland 
          project={project} 
          members={members} 
          isAdmin={isAdmin} 
        />
      </DashboardLayout>
    </>
  );
}
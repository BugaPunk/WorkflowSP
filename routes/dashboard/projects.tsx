import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DashboardLayout } from "../../components/DashboardLayout.tsx";
import { getSessionData, requireAuth, formatRole } from "../../utils/auth.ts";
import ProjectsListIsland from "../../islands/ProjectsListIsland.tsx";
import { ProjectStatus } from "../../models/project.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
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

    let projects = [];

    try {
      // Intentar obtener proyectos reales de la base de datos
      const response = await fetch(`${req.url.split('/dashboard')[0]}/api/projects`, {
        headers: {
          'Cookie': req.headers.get('Cookie') || ''
        }
      });

      if (response.ok) {
        const realProjects = await response.json();
        projects = realProjects.map((project: any) => ({
          ...project,
          status: project.status || ProjectStatus.ACTIVE,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt)
        }));
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      console.error("Error al obtener proyectos:", error);

      // En caso de error, usar datos de ejemplo
      projects = [
        {
          id: 1,
          name: "Proyecto Scrum",
          description: "Implementación de metodología Scrum para gestión de proyectos académicos.",
          ownerId: 1,
          createdAt: new Date("2023-05-15"),
          updatedAt: new Date("2023-05-15"),
          status: ProjectStatus.ACTIVE
        },
        {
          id: 2,
          name: "Sistema de Evaluación",
          description: "Desarrollo de un sistema de evaluación para proyectos académicos.",
          ownerId: 1,
          createdAt: new Date("2023-04-10"),
          updatedAt: new Date("2023-04-10"),
          status: ProjectStatus.IN_PROGRESS
        },
        {
          id: 3,
          name: "Portal Educativo",
          description: "Creación de un portal educativo para la Universidad La Salle.",
          ownerId: 1,
          createdAt: new Date("2023-03-20"),
          updatedAt: new Date("2023-03-20"),
          status: ProjectStatus.COMPLETED
        }
      ];
    }

    return ctx.render({ user, projects });
  },
};

export default function Projects({ data }: PageProps) {
  const { user, projects } = data;

  return (
    <>
      <Head>
        <title>Proyectos - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <ProjectsListIsland initialProjects={projects} userId={user.id} />
        </div>
      </DashboardLayout>
    </>
  );
}

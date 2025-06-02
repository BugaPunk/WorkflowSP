import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DashboardLayout } from "../../components/DashboardLayout.tsx";
import { getSessionData, requireAuth, formatRole } from "../../utils/auth.ts";

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

    return ctx.render({ user });
  },
};

export default function Projects({ data }: PageProps) {
  const { user } = data;

  return (
    <>
      <Head>
        <title>Proyectos - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Proyectos</h1>
            <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Nuevo Proyecto
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proyecto 1 */}
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-blue-600 text-white p-4">
                <h3 class="text-lg font-semibold">Proyecto Scrum</h3>
                <p class="text-sm text-blue-100">Creado: 15/05/2023</p>
              </div>
              <div class="p-4">
                <p class="text-gray-600 mb-4">Implementación de metodología Scrum para gestión de proyectos académicos.</p>
                <div class="flex justify-between items-center">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                  <button type="button" class="text-blue-600 hover:text-blue-800">Ver detalles</button>
                </div>
              </div>
            </div>

            {/* Proyecto 2 */}
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-purple-600 text-white p-4">
                <h3 class="text-lg font-semibold">Sistema de Evaluación</h3>
                <p class="text-sm text-purple-100">Creado: 10/04/2023</p>
              </div>
              <div class="p-4">
                <p class="text-gray-600 mb-4">Desarrollo de un sistema de evaluación para proyectos académicos.</p>
                <div class="flex justify-between items-center">
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">En progreso</span>
                  <button type="button" class="text-blue-600 hover:text-blue-800">Ver detalles</button>
                </div>
              </div>
            </div>

            {/* Proyecto 3 */}
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-green-600 text-white p-4">
                <h3 class="text-lg font-semibold">Portal Educativo</h3>
                <p class="text-sm text-green-100">Creado: 20/03/2023</p>
              </div>
              <div class="p-4">
                <p class="text-gray-600 mb-4">Creación de un portal educativo para la Universidad La Salle.</p>
                <div class="flex justify-between items-center">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Completado</span>
                  <button type="button" class="text-blue-600 hover:text-blue-800">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

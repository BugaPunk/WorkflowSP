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

export default function Dashboard({ data }: PageProps) {
  const { user } = data;

  return (
    <>
      <Head>
        <title>Dashboard - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h2 class="text-lg font-semibold text-blue-700 mb-2">Proyectos Activos</h2>
              <p class="text-3xl font-bold text-blue-600">3</p>
            </div>

            <div class="bg-green-50 border border-green-100 rounded-lg p-4">
              <h2 class="text-lg font-semibold text-green-700 mb-2">Tareas Completadas</h2>
              <p class="text-3xl font-bold text-green-600">12</p>
            </div>

            <div class="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <h2 class="text-lg font-semibold text-purple-700 mb-2">Miembros del Equipo</h2>
              <p class="text-3xl font-bold text-purple-600">5</p>
            </div>
          </div>

          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  U
                </div>
                <div>
                  <p class="text-gray-800 font-medium">Se creó un nuevo proyecto: "Proyecto Scrum"</p>
                  <p class="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                  U
                </div>
                <div>
                  <p class="text-gray-800 font-medium">Se completó la tarea: "Diseñar interfaz de usuario"</p>
                  <p class="text-sm text-gray-500">Hace 5 horas</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                  U
                </div>
                <div>
                  <p class="text-gray-800 font-medium">Se añadió un nuevo miembro al equipo: "Ana López"</p>
                  <p class="text-sm text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

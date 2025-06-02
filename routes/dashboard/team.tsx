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

export default function Team({ data }: PageProps) {
  const { user } = data;

  return (
    <>
      <Head>
        <title>Equipo - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Equipo</h1>
            <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Añadir Miembro
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Miembro 1 */}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div class="p-5">
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl">
                    JD
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Juan Pérez</h3>
                    <p class="text-sm text-gray-500">juan.perez@example.com</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Scrum Master
                  </span>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">Ver perfil</button>
                  <button type="button" class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            {/* Miembro 2 */}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div class="p-5">
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-xl">
                    AL
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Ana López</h3>
                    <p class="text-sm text-gray-500">ana.lopez@example.com</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Product Owner
                  </span>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">Ver perfil</button>
                  <button type="button" class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            {/* Miembro 3 */}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div class="p-5">
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold text-xl">
                    MR
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Miguel Rodríguez</h3>
                    <p class="text-sm text-gray-500">miguel.rodriguez@example.com</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Team Developer
                  </span>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">Ver perfil</button>
                  <button type="button" class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            {/* Miembro 4 */}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div class="p-5">
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold text-xl">
                    CS
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Carmen Sánchez</h3>
                    <p class="text-sm text-gray-500">carmen.sanchez@example.com</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Team Developer
                  </span>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">Ver perfil</button>
                  <button type="button" class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            {/* Miembro 5 */}
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div class="p-5">
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-xl">
                    LG
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Luis García</h3>
                    <p class="text-sm text-gray-500">luis.garcia@example.com</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Team Developer
                  </span>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">Ver perfil</button>
                  <button type="button" class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

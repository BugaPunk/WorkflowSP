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

export default function Tasks({ data }: PageProps) {
  const { user } = data;

  return (
    <>
      <Head>
        <title>Tareas - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Tareas</h1>
            <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Nueva Tarea
            </button>
          </div>

          <div class="mb-6">
            <div class="flex space-x-2 mb-4">
              <button type="button" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-md">Todas</button>
              <button type="button" class="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md">Pendientes</button>
              <button type="button" class="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md">En Progreso</button>
              <button type="button" class="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md">Completadas</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarea
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Límite
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">Diseñar interfaz de usuario</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">Proyecto Scrum</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completada
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Alta
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    20/05/2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                    <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
                  </td>
                </tr>

                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">Implementar autenticación</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">Sistema de Evaluación</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      En progreso
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Media
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    25/05/2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                    <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
                  </td>
                </tr>

                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">Crear documentación</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">Portal Educativo</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendiente
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Baja
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    30/05/2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                    <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

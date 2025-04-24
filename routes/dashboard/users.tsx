import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DashboardLayout } from "../../components/DashboardLayout.tsx";
import { getSessionData, requireAuth, formatRole } from "../../utils/auth.ts";
import NewUserButtonIsland from "../../islands/NewUserButtonIsland.tsx";

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

export default function Users({ data }: PageProps) {
  const { user } = data;

  // Datos de ejemplo para la tabla de usuarios
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      role: "admin",
      formattedRole: "Administrador",
      status: "active"
    },
    {
      id: 2,
      name: "Ana López",
      email: "ana.lopez@example.com",
      role: "scrum_master",
      formattedRole: "Scrum Master",
      status: "active"
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      role: "product_owner",
      formattedRole: "Product Owner",
      status: "active"
    },
    {
      id: 4,
      name: "María García",
      email: "maria.garcia@example.com",
      role: "team_developer",
      formattedRole: "Team Developer",
      status: "active"
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      email: "pedro.sanchez@example.com",
      role: "team_developer",
      formattedRole: "Team Developer",
      status: "inactive"
    }
  ];

  return (
    <>
      <Head>
        <title>Usuarios - WorkflowS</title>
      </Head>
      <DashboardLayout user={user}>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Usuarios</h1>
            <NewUserButtonIsland />
          </div>

          <div class="mb-6">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input
                type="search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar usuarios..."
              />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo Electrónico
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              
              <tbody class="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'scrum_master' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'product_owner' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.formattedRole}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button type="button" class="text-blue-600 hover:text-blue-900">
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button type="button" class="text-red-600 hover:text-red-900">
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Mostrando <span class="font-medium">1</span> a <span class="font-medium">5</span> de <span class="font-medium">5</span> resultados
            </div>
            <div class="flex space-x-2">
              <button
                type="button"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                <span class="material-symbols-outlined icon-sm">arrow_back</span>
              </button>
              <button
                type="button"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                <span class="material-symbols-outlined icon-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

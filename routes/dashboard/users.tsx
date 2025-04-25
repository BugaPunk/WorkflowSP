import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DashboardLayout } from "../../components/DashboardLayout.tsx";
import { getSessionData, requireAuth, formatRole } from "../../utils/auth.ts";
import NewUserButtonIsland from "../../islands/NewUserButtonIsland.tsx";
import UserTableIsland from "../../islands/UserTableIsland.tsx";
import { getAllUsers } from "../../db/services.ts";

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

    try {
      // Obtener todos los usuarios de la base de datos
      const dbUsers = await getAllUsers();

      // Formatear los roles para mostrarlos de manera más amigable
      const users = dbUsers.map(user => ({
        ...user,
        formattedRole: formatRole(user.role),
        status: 'active' // Por defecto todos los usuarios están activos
      }));

      return ctx.render({ user, users });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);

      // En caso de error, usar datos de ejemplo
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

      return ctx.render({ user, users });
    }
  },
};

export default function Users({ data }: PageProps) {
  const { user, users } = data;

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

          <UserTableIsland initialUsers={users} />
        </div>
      </DashboardLayout>
    </>
  );
}

import { Handlers } from "$fresh/server.ts";
import { createUser, updateUser, deleteUser, getUserById } from "../../db/services.ts";
import * as bcrypt from "bcrypt";
import { requireAuth } from "../../utils/auth.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    // Verificar si el usuario está autenticado
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const userData = await req.json();

      // Validar datos
      if (!userData.name || !userData.email || !userData.password) {
        return new Response(
          JSON.stringify({ error: "Todos los campos son requeridos" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Asegurarnos de que el rol siempre sea "team_developer"
      userData.role = "team_developer";

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(userData.password);

      // Crear usuario
      await createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      });

      return new Response(
        JSON.stringify({ message: "Usuario creado exitosamente" }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return new Response(
        JSON.stringify({ error: "Error al crear el usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  async PUT(req, _ctx) {
    // Verificar si el usuario está autenticado
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const userData = await req.json();

      // Validar datos
      if (!userData.id || !userData.name || !userData.email) {
        return new Response(
          JSON.stringify({ error: "ID, nombre y correo electrónico son requeridos" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Preparar datos para actualizar
      const updateData: Record<string, unknown> = {
        name: userData.name,
        email: userData.email,
      };

      // Si se proporciona una contraseña, hashearla
      if (userData.password) {
        updateData.password = await bcrypt.hash(userData.password);
      }

      // Si se proporciona un estado, actualizarlo
      if (userData.status) {
        updateData.status = userData.status;
      }

      // Actualizar usuario
      const updatedUser = await updateUser(userData.id, updateData);

      if (!updatedUser || updatedUser.length === 0) {
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          message: "Usuario actualizado exitosamente",
          user: updatedUser[0]
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar el usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  async DELETE(req, _ctx) {
    // Verificar si el usuario está autenticado
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const url = new URL(req.url);
      const id = parseInt(url.searchParams.get("id") || "");

      if (isNaN(id)) {
        return new Response(
          JSON.stringify({ error: "ID de usuario inválido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Verificar si el usuario existe
      const user = await getUserById(id);
      if (!user || user.length === 0) {
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Eliminar usuario
      await deleteUser(id);

      return new Response(
        JSON.stringify({ message: "Usuario eliminado exitosamente" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return new Response(
        JSON.stringify({ error: "Error al eliminar el usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};

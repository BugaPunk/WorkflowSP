import { Handlers } from "$fresh/server.ts";
import { createUser } from "../../db/services.ts";
import * as bcrypt from "bcrypt";
import { getSessionData, requireAuth } from "../../utils/auth.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
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
      if (!userData.name || !userData.email || !userData.password || !userData.role) {
        return new Response(
          JSON.stringify({ error: "Todos los campos son requeridos" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

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
};

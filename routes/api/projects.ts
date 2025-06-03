import { Handlers } from "$fresh/server.ts";
import { getAllProjects, createProject } from "../../db/services.ts";
import { getSessionData, requireAuth } from "../../utils/auth.ts";

export const handler: Handlers = {
  // Obtener todos los proyectos
  async GET(req) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Obtener proyectos
      const projects = await getAllProjects();

      return new Response(JSON.stringify(projects), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      return new Response(
        JSON.stringify({ error: "Error al obtener proyectos" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  // Crear un nuevo proyecto
  async POST(req) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const body = await req.json();
      
      // Validar datos
      if (!body.name) {
        return new Response(
          JSON.stringify({ error: "El nombre del proyecto es requerido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Obtener el ID del usuario de la sesión
      const sessionData = getSessionData(req);
      if (!sessionData) {
        return new Response(JSON.stringify({ error: "No autorizado" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Crear proyecto
      const [newProject] = await createProject({
        name: body.name,
        description: body.description || null,
        ownerId: body.ownerId || sessionData.id,
      });
      
      return new Response(JSON.stringify(newProject), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al crear proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
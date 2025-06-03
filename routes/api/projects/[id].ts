import { Handlers } from "$fresh/server.ts";
import { db } from "../../../db/db.ts";
import * as schema from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { requireAuth } from "../../../utils/auth.ts";

export const handler: Handlers = {
  // Obtener un proyecto por ID
  async GET(req, ctx) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const id = Number(ctx.params.id);
      
      if (isNaN(id)) {
        return new Response(
          JSON.stringify({ error: "ID de proyecto inválido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Obtener proyecto
      const projects = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
      
      if (projects.length === 0) {
        return new Response(
          JSON.stringify({ error: "Proyecto no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(JSON.stringify(projects[0]), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al obtener proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al obtener proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  // Actualizar un proyecto
  async PUT(req, ctx) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const id = Number(ctx.params.id);
      
      if (isNaN(id)) {
        return new Response(
          JSON.stringify({ error: "ID de proyecto inválido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

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

      // Actualizar proyecto
      const [updatedProject] = await db.update(schema.projects)
        .set({
          name: body.name,
          description: body.description,
          updatedAt: new Date(),
        })
        .where(eq(schema.projects.id, id))
        .returning();
      
      if (!updatedProject) {
        return new Response(
          JSON.stringify({ error: "Proyecto no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(JSON.stringify(updatedProject), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  // Eliminar un proyecto
  async DELETE(req, ctx) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const id = Number(ctx.params.id);
      
      if (isNaN(id)) {
        return new Response(
          JSON.stringify({ error: "ID de proyecto inválido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Eliminar proyecto
      const [deletedProject] = await db.delete(schema.projects)
        .where(eq(schema.projects.id, id))
        .returning();
      
      if (!deletedProject) {
        return new Response(
          JSON.stringify({ error: "Proyecto no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al eliminar proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
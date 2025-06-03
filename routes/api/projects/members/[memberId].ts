import { Handlers } from "$fresh/server.ts";
import { db } from "../../../../db/db.ts";
import * as schema from "../../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { getSessionData, requireAuth } from "../../../../utils/auth.ts";

export const handler: Handlers = {
  // Eliminar un miembro del proyecto
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
      const memberId = parseInt(ctx.params.memberId);
      
      if (isNaN(memberId)) {
        return new Response(JSON.stringify({ error: "ID de miembro inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Verificar que el miembro existe
      const [existingMember] = await db
        .select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.id, memberId))
        .limit(1);

      if (!existingMember) {
        return new Response(
          JSON.stringify({ error: "Miembro no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Eliminar miembro
      await db
        .delete(schema.teamMembers)
        .where(eq(schema.teamMembers.id, memberId));
      
      return new Response(JSON.stringify({ message: "Miembro eliminado exitosamente" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al eliminar miembro del proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al eliminar miembro del proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  // Actualizar rol de un miembro
  async PATCH(req, ctx) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const memberId = parseInt(ctx.params.memberId);
      const body = await req.json();
      
      if (isNaN(memberId)) {
        return new Response(JSON.stringify({ error: "ID de miembro inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!body.role) {
        return new Response(
          JSON.stringify({ error: "El rol es requerido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Verificar que el miembro existe
      const [existingMember] = await db
        .select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.id, memberId))
        .limit(1);

      if (!existingMember) {
        return new Response(
          JSON.stringify({ error: "Miembro no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Actualizar rol
      const [updatedMember] = await db
        .update(schema.teamMembers)
        .set({ 
          role: body.role,
          updatedAt: new Date()
        })
        .where(eq(schema.teamMembers.id, memberId))
        .returning();
      
      return new Response(JSON.stringify(updatedMember), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al actualizar miembro del proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar miembro del proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};

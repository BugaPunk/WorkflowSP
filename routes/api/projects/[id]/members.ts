import { Handlers } from "$fresh/server.ts";
import { 
  addTeamMember, 
  getTeamsByProjectId, 
  createTeam,
  getTeamMembersByTeamId,
  getUserById 
} from "../../../../db/services.ts";
import { getSessionData, requireAuth } from "../../../../utils/auth.ts";

export const handler: Handlers = {
  // Obtener miembros de un proyecto
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
      const projectId = parseInt(ctx.params.id);
      
      if (isNaN(projectId)) {
        return new Response(JSON.stringify({ error: "ID de proyecto inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Obtener equipos del proyecto
      const teams = await getTeamsByProjectId(projectId);
      
      let allMembers = [];
      
      // Obtener miembros de todos los equipos del proyecto
      for (const team of teams) {
        const teamMembers = await getTeamMembersByTeamId(team.id);
        
        // Enriquecer con información del usuario
        for (const member of teamMembers) {
          const [user] = await getUserById(member.userId);
          if (user) {
            allMembers.push({
              id: member.id,
              userId: member.userId,
              projectId: projectId,
              teamId: member.teamId,
              role: member.role,
              username: user.name,
              email: user.email,
              createdAt: member.createdAt,
              updatedAt: member.updatedAt
            });
          }
        }
      }
      
      return new Response(JSON.stringify(allMembers), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al obtener miembros del proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al obtener miembros del proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },

  // Asignar un usuario a un proyecto
  async POST(req, ctx) {
    // Verificar autenticación
    const redirectResponse = requireAuth(req);
    if (redirectResponse) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const projectId = parseInt(ctx.params.id);
      const body = await req.json();
      
      if (isNaN(projectId)) {
        return new Response(JSON.stringify({ error: "ID de proyecto inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Validar datos
      if (!body.userId || !body.role) {
        return new Response(
          JSON.stringify({ error: "userId y role son requeridos" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Verificar que el usuario existe
      const [user] = await getUserById(body.userId);
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Obtener o crear equipo principal del proyecto
      let teams = await getTeamsByProjectId(projectId);
      let mainTeam;
      
      if (teams.length === 0) {
        // Crear equipo principal si no existe
        const [newTeam] = await createTeam({
          name: "Equipo Principal",
          projectId: projectId
        });
        mainTeam = newTeam;
      } else {
        mainTeam = teams[0]; // Usar el primer equipo
      }

      // Verificar si el usuario ya está en el equipo
      const existingMembers = await getTeamMembersByTeamId(mainTeam.id);
      const isAlreadyMember = existingMembers.some(member => member.userId === body.userId);
      
      if (isAlreadyMember) {
        return new Response(
          JSON.stringify({ error: "El usuario ya es miembro de este proyecto" }),
          {
            status: 409,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Agregar miembro al equipo
      const [newMember] = await addTeamMember({
        teamId: mainTeam.id,
        userId: body.userId,
        role: body.role
      });

      // Devolver el miembro con información del usuario
      const memberWithUserInfo = {
        id: newMember.id,
        userId: newMember.userId,
        projectId: projectId,
        teamId: newMember.teamId,
        role: newMember.role,
        username: user.name,
        email: user.email,
        createdAt: newMember.createdAt,
        updatedAt: newMember.updatedAt
      };
      
      return new Response(JSON.stringify(memberWithUserInfo), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al asignar usuario al proyecto:", error);
      return new Response(
        JSON.stringify({ error: "Error al asignar usuario al proyecto" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};

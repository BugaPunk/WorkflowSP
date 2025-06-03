import { 
  getAllProjects, 
  getAllUsers, 
  getTeamsByProjectId, 
  createTeam,
  addTeamMember,
  getTeamMembersByTeamId 
} from "../db/services.ts";
import { closePool } from "../db/db.ts";

/**
 * Script para probar la funcionalidad de asignación de miembros a proyectos
 */
async function testProjectMembers() {
  console.log("🧪 Probando funcionalidad de miembros de proyectos...");
  console.log("=" .repeat(50));
  
  try {
    // 1. Obtener proyectos y usuarios
    const projects = await getAllProjects();
    const users = await getAllUsers();
    
    console.log(`📊 Proyectos disponibles: ${projects.length}`);
    console.log(`👥 Usuarios disponibles: ${users.length}`);
    
    if (projects.length === 0 || users.length === 0) {
      console.log("❌ No hay suficientes datos para la prueba");
      console.log("💡 Ejecuta: deno task seed-projects");
      return;
    }
    
    // 2. Tomar el primer proyecto para la prueba
    const testProject = projects[0];
    console.log(`\n🎯 Proyecto de prueba: ${testProject.name} (ID: ${testProject.id})`);
    
    // 3. Verificar si ya tiene equipos
    let teams = await getTeamsByProjectId(testProject.id);
    console.log(`📋 Equipos existentes: ${teams.length}`);
    
    // 4. Crear equipo si no existe
    if (teams.length === 0) {
      console.log("🔧 Creando equipo principal...");
      const [newTeam] = await createTeam({
        name: "Equipo Principal",
        projectId: testProject.id
      });
      teams = [newTeam];
      console.log(`✅ Equipo creado: ${newTeam.name} (ID: ${newTeam.id})`);
    }
    
    const mainTeam = teams[0];
    
    // 5. Verificar miembros existentes
    const existingMembers = await getTeamMembersByTeamId(mainTeam.id);
    console.log(`👥 Miembros existentes en el equipo: ${existingMembers.length}`);
    
    // 6. Asignar usuarios de diferentes roles al proyecto
    const rolesToAssign = ["product_owner", "scrum_master", "team_member"];
    
    for (let i = 0; i < Math.min(3, users.length); i++) {
      const user = users[i];
      const projectRole = rolesToAssign[i] || "team_member";
      
      // Verificar si ya es miembro
      const isAlreadyMember = existingMembers.some(member => member.userId === user.id);
      
      if (!isAlreadyMember) {
        console.log(`\n👤 Asignando usuario: ${user.name} (${user.email})`);
        console.log(`   Rol del sistema: ${user.role}`);
        console.log(`   Rol en el proyecto: ${projectRole}`);
        
        try {
          const [newMember] = await addTeamMember({
            teamId: mainTeam.id,
            userId: user.id,
            role: projectRole
          });
          
          console.log(`✅ Usuario asignado exitosamente (ID: ${newMember.id})`);
        } catch (error) {
          console.log(`❌ Error al asignar usuario: ${error}`);
        }
      } else {
        console.log(`ℹ️  Usuario ${user.name} ya es miembro del proyecto`);
      }
    }
    
    // 7. Mostrar resumen final
    const finalMembers = await getTeamMembersByTeamId(mainTeam.id);
    console.log("\n" + "=" .repeat(50));
    console.log("📊 RESUMEN FINAL:");
    console.log(`   Proyecto: ${testProject.name}`);
    console.log(`   Equipo: ${mainTeam.name}`);
    console.log(`   Total de miembros: ${finalMembers.length}`);
    
    if (finalMembers.length > 0) {
      console.log("\n👥 Miembros del proyecto:");
      for (const member of finalMembers) {
        const [user] = await getAllUsers().then(users => users.filter(u => u.id === member.userId));
        if (user) {
          console.log(`   • ${user.name} (${user.email})`);
          console.log(`     Rol del sistema: ${user.role}`);
          console.log(`     Rol en el proyecto: ${member.role}`);
          console.log(`     Asignado: ${member.createdAt}`);
          console.log("");
        }
      }
    }
    
    console.log("🎉 ¡Prueba completada exitosamente!");
    
  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
  } finally {
    await closePool();
  }
}

// Ejecutar si este archivo se ejecuta directamente
if (import.meta.main) {
  await testProjectMembers();
}

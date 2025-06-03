import { getAllProjects } from "../db/services.ts";
import { closePool } from "../db/db.ts";

/**
 * Script para probar que los proyectos se estén obteniendo correctamente
 */
async function testProjectsAPI() {
  console.log("🧪 Probando API de proyectos...");
  
  try {
    // Obtener proyectos directamente de la base de datos
    const projects = await getAllProjects();
    
    console.log(`📊 Total de proyectos en la base de datos: ${projects.length}`);
    
    if (projects.length > 0) {
      console.log("\n📋 Proyectos encontrados:");
      projects.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.name}`);
        console.log(`      ID: ${project.id}`);
        console.log(`      Descripción: ${project.description || 'Sin descripción'}`);
        console.log(`      Owner ID: ${project.ownerId}`);
        console.log(`      Creado: ${project.createdAt}`);
        console.log("");
      });
    } else {
      console.log("❌ No se encontraron proyectos en la base de datos");
      console.log("💡 Ejecuta: deno task seed-projects");
    }
    
  } catch (error) {
    console.error("❌ Error al obtener proyectos:", error);
  } finally {
    await closePool();
  }
}

// Ejecutar si este archivo se ejecuta directamente
if (import.meta.main) {
  await testProjectsAPI();
}

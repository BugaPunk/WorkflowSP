import { createProject, getAllUsers } from "../db/services.ts";
import { closePool } from "../db/db.ts";

/**
 * Script para crear proyectos de ejemplo en la base de datos
 */
async function seedProjects() {
  console.log("🌱 Creando proyectos de ejemplo...");
  
  try {
    // Obtener usuarios existentes
    const users = await getAllUsers();
    
    if (users.length === 0) {
      console.log("❌ No hay usuarios en la base de datos. Ejecuta primero: deno task init");
      return;
    }
    
    const adminUser = users.find(user => user.role === 'admin') || users[0];
    
    // Proyectos de ejemplo
    const sampleProjects = [
      {
        name: "Proyecto Scrum Académico",
        description: "Implementación de metodología Scrum para gestión de proyectos académicos en la Universidad La Salle.",
        ownerId: adminUser.id
      },
      {
        name: "Sistema de Evaluación",
        description: "Desarrollo de un sistema de evaluación automatizada para proyectos de estudiantes.",
        ownerId: adminUser.id
      },
      {
        name: "Portal Educativo",
        description: "Creación de un portal educativo interactivo para mejorar la experiencia de aprendizaje.",
        ownerId: adminUser.id
      },
      {
        name: "App Móvil Universitaria",
        description: "Desarrollo de una aplicación móvil para estudiantes con funcionalidades de campus virtual.",
        ownerId: adminUser.id
      }
    ];
    
    // Crear proyectos
    for (const projectData of sampleProjects) {
      try {
        const [newProject] = await createProject(projectData);
        console.log(`✅ Proyecto creado: ${newProject.name} (ID: ${newProject.id})`);
      } catch (error) {
        console.log(`❌ Error al crear proyecto "${projectData.name}":`, error);
      }
    }
    
    console.log("🎉 ¡Proyectos de ejemplo creados exitosamente!");
    
  } catch (error) {
    console.error("❌ Error al crear proyectos de ejemplo:", error);
  } finally {
    await closePool();
  }
}

// Ejecutar si este archivo se ejecuta directamente
if (import.meta.main) {
  await seedProjects();
}

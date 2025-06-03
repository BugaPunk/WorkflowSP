import { createUser, getUserByEmail } from "../db/services.ts";
import { hash } from "bcrypt";
import { closePool } from "../db/db.ts";

/**
 * Script para crear usuarios de ejemplo con diferentes roles
 */
async function seedUsers() {
  console.log("👥 Creando usuarios de ejemplo...");
  
  try {
    // Usuarios de ejemplo con diferentes roles
    const sampleUsers = [
      {
        name: "María García",
        email: "maria.garcia@workflow.com",
        password: "password123",
        role: "scrum_master"
      },
      {
        name: "Carlos López",
        email: "carlos.lopez@workflow.com", 
        password: "password123",
        role: "product_owner"
      },
      {
        name: "Ana Rodríguez",
        email: "ana.rodriguez@workflow.com",
        password: "password123",
        role: "team_developer"
      },
      {
        name: "Luis Martínez",
        email: "luis.martinez@workflow.com",
        password: "password123",
        role: "team_developer"
      },
      {
        name: "Sofia Hernández",
        email: "sofia.hernandez@workflow.com",
        password: "password123",
        role: "team_developer"
      }
    ];
    
    // Crear usuarios
    for (const userData of sampleUsers) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await getUserByEmail(userData.email);
        
        if (existingUser.length > 0) {
          console.log(`ℹ️  Usuario ya existe: ${userData.email}`);
          continue;
        }
        
        // Hash de la contraseña
        const hashedPassword = await hash(userData.password);
        
        // Crear usuario
        const [newUser] = await createUser({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role
        });
        
        console.log(`✅ Usuario creado: ${newUser.name} (${newUser.role})`);
        
      } catch (error) {
        console.log(`❌ Error al crear usuario "${userData.name}":`, error);
      }
    }
    
    console.log("🎉 ¡Usuarios de ejemplo creados exitosamente!");
    
  } catch (error) {
    console.error("❌ Error al crear usuarios de ejemplo:", error);
  } finally {
    await closePool();
  }
}

// Ejecutar si este archivo se ejecuta directamente
if (import.meta.main) {
  await seedUsers();
}

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, closePool } from "../db/db.ts";
import { createUser, getUserByEmail } from "../db/services.ts";
import { hash } from "bcrypt";
import { initDatabase } from "../utils/db.ts";

/**
 * Inicializa el proyecto WorkflowS con base de datos y usuario administrador
 */
async function initProject() {
  console.log("🚀 Inicializando proyecto WorkflowS...");
  console.log("=" .repeat(50));
  
  try {
    // 1. Conectar a la base de datos
    console.log("📡 Conectando a la base de datos...");
    await initDatabase();
    console.log("✅ Conexión a la base de datos establecida");
    
    // 2. Ejecutar migraciones
    console.log("🔄 Ejecutando migraciones de base de datos...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migraciones ejecutadas correctamente");
    
    // 3. Crear usuario administrador por defecto
    console.log("👤 Verificando usuario administrador...");
    await createDefaultAdmin();
    
    console.log("=" .repeat(50));
    console.log("🎉 ¡Proyecto inicializado correctamente!");
    console.log("");
    console.log("📋 Próximos pasos:");
    console.log("   1. Ejecuta: deno task start");
    console.log("   2. Ve a: http://localhost:8000");
    console.log("   3. Inicia sesión con las credenciales del administrador");
    console.log("");
    
  } catch (error) {
    console.error("❌ Error durante la inicialización:", error);
    console.log("");
    console.log("🔧 Posibles soluciones:");
    console.log("   1. Verifica que PostgreSQL esté ejecutándose");
    console.log("   2. Confirma las credenciales de la base de datos en drizzle.config.ts");
    console.log("   3. Asegúrate de que la base de datos 'workflow_db' exista");
    Deno.exit(1);
  } finally {
    // Cerrar la conexión a la base de datos
    await closePool();
  }
}

/**
 * Crea un usuario administrador por defecto si no existe
 */
async function createDefaultAdmin() {
  const adminEmail = "admin@workflow.com";
  const adminPassword = "admin123";
  
  try {
    // Verificar si ya existe un administrador
    const existingAdmin = await getUserByEmail(adminEmail);
    
    if (existingAdmin.length > 0) {
      console.log("ℹ️  Usuario administrador ya existe");
      console.log(`   Email: ${adminEmail}`);
      return;
    }
    
    // Crear el usuario administrador
    console.log("🔐 Creando usuario administrador por defecto...");
    const hashedPassword = await hash(adminPassword);
    
    const adminUser = {
      name: "Administrador del Sistema",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    };
    
    await createUser(adminUser);
    
    console.log("✅ Usuario administrador creado exitosamente");
    console.log("");
    console.log("🔑 Credenciales del administrador:");
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("");
    console.log("⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión");
    
  } catch (error) {
    console.error("❌ Error al crear usuario administrador:", error);
    throw error;
  }
}

/**
 * Verifica los requisitos del sistema antes de la inicialización
 */
async function checkSystemRequirements() {
  console.log("🔍 Verificando requisitos del sistema...");
  
  // Verificar que Deno esté disponible
  try {
    const denoVersion = Deno.version.deno;
    console.log(`✅ Deno ${denoVersion} detectado`);
  } catch {
    console.error("❌ Deno no está disponible");
    Deno.exit(1);
  }
  
  // Verificar archivos de configuración
  try {
    await Deno.stat("drizzle.config.ts");
    console.log("✅ Configuración de Drizzle encontrada");
  } catch {
    console.error("❌ Archivo drizzle.config.ts no encontrado");
    Deno.exit(1);
  }
  
  try {
    await Deno.stat("drizzle");
    console.log("✅ Directorio de migraciones encontrado");
  } catch {
    console.error("❌ Directorio de migraciones no encontrado");
    Deno.exit(1);
  }
}

// Ejecutar inicialización si este archivo se ejecuta directamente
if (import.meta.main) {
  await checkSystemRequirements();
  await initProject();
}

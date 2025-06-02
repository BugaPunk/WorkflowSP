import { db, closePool } from "../db/db.ts";
import { getUserByEmail, getAllUsers } from "../db/services.ts";

/**
 * Verifica que el proyecto esté configurado correctamente
 */
async function verifySetup() {
  console.log("🔍 Verificando configuración del proyecto WorkflowS...");
  console.log("=" .repeat(50));
  
  let allChecksPass = true;
  
  try {
    // 1. Verificar conexión a la base de datos
    console.log("📡 Verificando conexión a la base de datos...");
    
    try {
      // Intentar una consulta simple
      const result = await db.execute(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
      );
      
      const tableNames = result.rows.map(row => row.table_name);
      const expectedTables = ['users', 'projects', 'teams', 'team_members', 'sprints', 'tasks', 'comments', 'evaluations'];
      
      console.log(`✅ Conexión exitosa - ${tableNames.length} tablas encontradas`);
      
      // Verificar que todas las tablas esperadas existan
      const missingTables = expectedTables.filter(table => !tableNames.includes(table));
      if (missingTables.length > 0) {
        console.log(`❌ Tablas faltantes: ${missingTables.join(', ')}`);
        allChecksPass = false;
      } else {
        console.log("✅ Todas las tablas requeridas están presentes");
      }
      
    } catch (error) {
      console.log("❌ Error de conexión a la base de datos:", error);
      allChecksPass = false;
    }
    
    // 2. Verificar usuario administrador
    console.log("\n👤 Verificando usuario administrador...");
    
    try {
      const adminUser = await getUserByEmail("admin@workflow.com");
      
      if (adminUser.length > 0) {
        const admin = adminUser[0];
        console.log("✅ Usuario administrador encontrado:");
        console.log(`   ID: ${admin.id}`);
        console.log(`   Nombre: ${admin.name}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Rol: ${admin.role}`);
        console.log(`   Creado: ${admin.createdAt}`);
      } else {
        console.log("❌ Usuario administrador no encontrado");
        console.log("   Ejecuta: deno task init");
        allChecksPass = false;
      }
      
    } catch (error) {
      console.log("❌ Error al verificar usuario administrador:", error);
      allChecksPass = false;
    }
    
    // 3. Verificar total de usuarios
    console.log("\n📊 Estadísticas de usuarios...");
    
    try {
      const allUsers = await getAllUsers();
      console.log(`✅ Total de usuarios en el sistema: ${allUsers.length}`);
      
      // Contar usuarios por rol
      const roleCount = allUsers.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log("📈 Distribución por roles:");
      Object.entries(roleCount).forEach(([role, count]) => {
        console.log(`   ${role}: ${count} usuario(s)`);
      });
      
    } catch (error) {
      console.log("❌ Error al obtener estadísticas de usuarios:", error);
      allChecksPass = false;
    }
    
    // 4. Verificar archivos de configuración
    console.log("\n📁 Verificando archivos de configuración...");
    
    const configFiles = [
      "deno.json",
      "fresh.config.ts",
      "drizzle.config.ts",
      "tailwind.config.ts"
    ];
    
    for (const file of configFiles) {
      try {
        await Deno.stat(file);
        console.log(`✅ ${file} encontrado`);
      } catch {
        console.log(`❌ ${file} no encontrado`);
        allChecksPass = false;
      }
    }
    
    // Resultado final
    console.log("\n" + "=" .repeat(50));
    
    if (allChecksPass) {
      console.log("🎉 ¡Configuración verificada exitosamente!");
      console.log("");
      console.log("✅ El proyecto está listo para usar");
      console.log("✅ Puedes ejecutar: deno task start");
      console.log("");
      console.log("🔑 Credenciales de acceso:");
      console.log("   Email: admin@workflow.com");
      console.log("   Password: admin123");
    } else {
      console.log("❌ Se encontraron problemas en la configuración");
      console.log("");
      console.log("🔧 Soluciones recomendadas:");
      console.log("   1. Ejecuta: deno task init");
      console.log("   2. Verifica la configuración de PostgreSQL");
      console.log("   3. Revisa las credenciales en drizzle.config.ts");
    }
    
  } catch (error) {
    console.error("❌ Error durante la verificación:", error);
    allChecksPass = false;
  } finally {
    await closePool();
  }
  
  // Salir con código de error si hay problemas
  if (!allChecksPass) {
    Deno.exit(1);
  }
}

// Ejecutar verificación si este archivo se ejecuta directamente
if (import.meta.main) {
  await verifySetup();
}

# WorkflowS - Plataforma de Gestión de Proyectos Académicos

WorkflowS es una plataforma basada en la metodología Scrum para la gestión de proyectos académicos en la Universidad La Salle. Desarrollada con Deno Fresh, Preact y Tailwind CSS.

## 🚀 Características

- **Gestión de usuarios** con roles (Admin, Scrum Master, Product Owner, Team Developer)
- **Autenticación y autorización** segura
- **Dashboard interactivo** con métricas del proyecto
- **Tema oscuro/claro** dinámico
- **Interfaz responsiva** para móvil y desktop
- **Base de datos PostgreSQL** con Drizzle ORM

## 📋 Requisitos Previos

- [Deno](https://deno.land/manual/getting_started/installation) (versión 1.40 o superior)
- [PostgreSQL](https://www.postgresql.org/download/) (versión 12 o superior)

## ⚡ Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd WorkflowS
```

### 2. Configurar PostgreSQL
Asegúrate de que PostgreSQL esté ejecutándose y crea la base de datos:

```sql
CREATE DATABASE workflow_db;
```

### 3. Configurar credenciales de base de datos
Edita el archivo `drizzle.config.ts` con tus credenciales de PostgreSQL:

```typescript
export default defineConfig({
  // ...
  dbCredentials: {
    host: "localhost",
    user: "tu_usuario",
    password: "tu_contraseña",
    database: "workflow_db",
  },
});
```

### 4. Inicializar el proyecto
```bash
deno task init
```

Este comando:
- ✅ Conecta a la base de datos
- ✅ Ejecuta las migraciones
- ✅ Crea un usuario administrador por defecto

### 5. Iniciar la aplicación
```bash
deno task start
```

La aplicación estará disponible en: http://localhost:8000

## 🔑 Credenciales por Defecto

Después de ejecutar `deno task init`, podrás iniciar sesión con:

- **Email:** admin@workflow.com
- **Password:** admin123

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer inicio de sesión.

## 📝 Comandos Disponibles

```bash
# Inicializar proyecto completo (migraciones + usuario admin)
deno task init

# Iniciar servidor de desarrollo
deno task start

# Ejecutar solo migraciones
deno task migrate

# Probar conexión a la base de datos
deno task test-db

# Verificar que todo esté configurado correctamente
deno task verify

# Verificar código (formato, lint, tipos)
deno task check

# Construir para producción
deno task build

# Vista previa de producción
deno task preview
```

## 🏗️ Estructura del Proyecto

```
WorkflowS/
├── routes/           # Rutas de la aplicación
├── islands/          # Componentes interactivos (Fresh Islands)
├── components/       # Componentes reutilizables
├── db/              # Esquema y servicios de base de datos
├── utils/           # Utilidades y helpers
├── scripts/         # Scripts de inicialización y migración
├── static/          # Archivos estáticos (CSS, imágenes)
└── drizzle/         # Migraciones de base de datos
```

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de autenticación completo
- ✅ Gestión de usuarios (CRUD)
- ✅ Dashboard con métricas
- ✅ Navegación responsiva
- ✅ Tema oscuro/claro
- ✅ Sistema de roles
- ✅ API RESTful

## 🔄 Próximas Funcionalidades

- 🔲 Gestión de proyectos
- 🔲 Sprints y tareas
- 🔲 Tablero Kanban
- 🔲 Sistema de evaluaciones
- 🔲 Reportes y estadísticas

## 🛠️ Tecnologías Utilizadas

- **Framework:** Deno Fresh 1.7.3
- **Frontend:** Preact 10.22.0
- **Estilos:** Tailwind CSS 3.4.1
- **Base de datos:** PostgreSQL + Drizzle ORM
- **Autenticación:** Cookies seguras + bcrypt
- **Iconos:** Material Symbols

## Directorio

```
.
├── biome.json
├── components
│   ├── AssignProjectForm.tsx
│   ├── CreateProjectForm.tsx
│   ├── DashboardLayout.tsx
│   ├── EditProjectForm.tsx
│   ├── Modal.tsx
│   ├── ProjectModals
│   │   ├── AssignProjectModal.tsx
│   │   ├── CreateProjectModal.tsx
│   │   └── EditProjectModal.tsx
│   ├── Projects
│   │   └── ProjectMembersList.tsx
│   ├── Sidebar.tsx
│   └── TextInput.tsx
├── db
│   ├── db.ts
│   ├── migrate.ts
│   ├── schema.ts
│   ├── services.ts
│   └── test-connection.ts
├── deno.json
├── dev.ts
├── drizzle
│   ├── 0000_wide_ken_ellis.sql
│   └── meta
│       ├── 0000_snapshot.json
│       └── _journal.json
├── drizzle.config.ts
├── fresh.config.ts
├── fresh.gen.ts
├── islands
│   ├── DeleteConfirmationIsland.tsx
│   ├── DeleteUserConfirmationIsland.tsx
│   ├── EditUserFormIsland.tsx
│   ├── ModalIsland.tsx
│   ├── NewUserButtonIsland.tsx
│   ├── ProjectDetailIsland.tsx
│   ├── ProjectsListIsland.tsx
│   ├── SidebarIsland.tsx
│   ├── ThemeSwitchIsland.tsx
│   ├── UserFormIsland.tsx
│   ├── UserSearchIsland.tsx
│   └── UserTableIsland.tsx
├── main.ts
├── models
│   └── project.ts
├── README.md
├── routes
│   ├── _404.tsx
│   ├── about.tsx
│   ├── api
│   │   ├── db-test.ts
│   │   ├── projects
│   │   │   ├── [id]
│   │   │   │   └── members.ts
│   │   │   ├── [id].ts
│   │   │   └── members
│   │   │       └── [memberId].ts
│   │   ├── projects.ts
│   │   └── users.ts
│   ├── _app.tsx
│   ├── auth
│   │   ├── login.tsx
│   │   ├── logout.ts
│   │   └── register.tsx
│   ├── dashboard
│   │   ├── index.tsx
│   │   ├── projects
│   │   │   └── [id].tsx
│   │   ├── projects.tsx
│   │   ├── tasks.tsx
│   │   ├── team.tsx
│   │   └── users.tsx
│   └── index.tsx
├── scripts
│   ├── check-tables.ts
│   ├── init-project.ts
│   ├── migrate.ts
│   ├── seed-projects.ts
│   ├── seed-users.ts
│   ├── test-db.ts
│   ├── test-project-members.ts
│   ├── test-projects-api.ts
│   └── verify-setup.ts
├── static
│   ├── dark-theme.css
│   ├── favicon.ico
│   ├── light-theme.css
│   ├── logo.svg
│   ├── styles.css
│   └── theme.js
├── tailwind.config.js
├── tailwind.config.ts
└── utils
    ├── auth.ts
    ├── db.ts
    └── hooks.ts

19 directories, 79 files

```

## 📚 Documentación Adicional

- [Guía de configuración detallada](./docs/setup-guide.md)
- [Guía de desarrollo](./docs/avance_desarrollo_20250425.md)
- [Implementación de tema oscuro](./docs/implementacion_tema_oscuro.md)
- [Material Symbols](./docs/Guia_Material_Simbols.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request



**Desarrollado con ❤️ para la Universidad La Salle**

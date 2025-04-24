import { useState } from "preact/hooks";
import { cn, useIsMobile } from "../utils/hooks.ts";

// Material Symbols Icons Component
function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    iconName: "dashboard",
  },
  {
    title: "Proyectos",
    href: "/dashboard/projects",
    iconName: "folder",
  },
  {
    title: "Tareas",
    href: "/dashboard/tasks",
    iconName: "task",
  },
  {
    title: "Equipo",
    href: "/dashboard/team",
    iconName: "group",
  },
  {
    title: "Usuarios",
    href: "/dashboard/users",
    iconName: "person",
  },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
    formattedRole?: string;
  };
}

export default function SidebarIsland({
  user = {
    name: "Usuario",
    email: "usuario@example.com",
    role: "team_developer",
    formattedRole: "Team Developer"
  }
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
        >
          <MaterialIcon name="menu" className="icon-md" />
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-600">WorkflowS</h2>
                    <button type="button" onClick={toggleMobileMenu} className="p-2 text-gray-500">
                      <MaterialIcon name="close" className="icon-md" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-3 rounded-md p-1.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <MaterialIcon name={item.iconName} className="icon-md" />
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.formattedRole || user.role}</p>
                    </div>
                  </div>
                  <a
                    href="/auth/logout"
                    className="flex items-center gap-3 rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  >
                    <MaterialIcon name="logout" className="icon-md" />
                    <span>Cerrar Sesión</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && <h2 className="text-xl font-bold text-blue-600">WorkflowS</h2>}
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "p-2 rounded-md hover:bg-gray-100",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
        >
          <MaterialIcon
            name={isCollapsed ? "chevron_right" : "chevron_left"}
            className="icon-md"
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md p-1.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                isCollapsed && "justify-center px-1.5"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <MaterialIcon name={item.iconName} className={cn("icon-md", isCollapsed && "icon-lg")} />
              {!isCollapsed && <span>{item.title}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user.name.charAt(0)}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.formattedRole || user.role}</p>
            </div>
          </div>
        )}
        <a
          href="/auth/logout"
          className={cn(
            "flex items-center gap-3 rounded-md p-1.5 text-red-600 hover:bg-red-50 mt-2",
            isCollapsed && "justify-center px-1.5"
          )}
          title={isCollapsed ? "Cerrar Sesión" : undefined}
        >
          <MaterialIcon name="logout" className={cn("icon-md", isCollapsed && "icon-lg")} />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </a>
      </div>
    </div>
  );
}

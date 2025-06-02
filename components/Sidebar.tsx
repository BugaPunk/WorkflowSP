import { cn, useIsMobile } from "../utils/hooks.ts";
import { JSX } from "preact";
import { useState } from "preact/hooks";

// Icons
function HomeIcon(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ProjectIcon(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function TaskIcon(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function LogoutIcon(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Proyectos",
    href: "/dashboard/projects",
    icon: ProjectIcon,
  },
  {
    title: "Tareas",
    href: "/dashboard/tasks",
    icon: TaskIcon,
  },
  {
    title: "Equipo",
    href: "/dashboard/team",
    icon: UsersIcon,
  },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export function Sidebar({ user = { name: "Usuario", email: "usuario@example.com", role: "team_developer" } }: SidebarProps) {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <item.icon className="h-5 w-5" />
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
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <a
                    href="/auth/logout"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogoutIcon className="h-5 w-5" />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={isCollapsed ? "rotate-180" : ""}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5" />
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
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
        )}
        <a
          href="/auth/logout"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50 mt-2",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Cerrar Sesión" : undefined}
        >
          <LogoutIcon className="h-5 w-5" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </a>
      </div>
    </div>
  );
}

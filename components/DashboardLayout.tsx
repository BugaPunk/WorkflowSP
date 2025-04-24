import { ComponentChildren } from "preact";
import SidebarIsland from "../islands/SidebarIsland.tsx";

interface DashboardLayoutProps {
  children: ComponentChildren;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export function DashboardLayout({
  children,
  user = { name: "Usuario", email: "usuario@example.com", role: "team_developer" }
}: DashboardLayoutProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <SidebarIsland user={user} />

      <main class="transition-all duration-300 ml-0 md:ml-64 pt-16 md:pt-0">
        <div class="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "preact/hooks";
import { Project, ProjectRole } from "../models/project.ts";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AssignProjectFormProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AssignProjectForm({
  project,
  onSuccess,
  onCancel,
}: AssignProjectFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [selectedRole, setSelectedRole] = useState<ProjectRole>(ProjectRole.TEAM_MEMBER);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await fetch("/api/users");
        
        if (!response.ok) {
          throw new Error("Error al cargar usuarios");
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    // Validación básica
    if (!selectedUserId) {
      setError("Debes seleccionar un usuario");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Llamada a la API para asignar el usuario al proyecto
      const response = await fetch(`/api/projects/${project.id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUserId,
          projectId: project.id,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al asignar usuario al proyecto");
      }

      // Usuario asignado exitosamente
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al asignar usuario al proyecto");
      console.error("Error asignando usuario:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div class="mb-4">
        <label for="user-select" class="block text-sm font-medium text-gray-700 mb-1">
          Usuario
        </label>
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number((e.target as HTMLSelectElement).value))}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoadingUsers}
          required
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        {isLoadingUsers && <p class="mt-1 text-sm text-gray-500">Cargando usuarios...</p>}
      </div>

      <div class="mb-6">
        <label for="role-select" class="block text-sm font-medium text-gray-700 mb-1">
          Rol en el Proyecto
        </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole((e.target as HTMLSelectElement).value as ProjectRole)}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value={ProjectRole.PRODUCT_OWNER}>Product Owner</option>
          <option value={ProjectRole.SCRUM_MASTER}>Scrum Master</option>
          <option value={ProjectRole.TEAM_MEMBER}>Miembro del Equipo</option>
        </select>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading || isLoadingUsers}
        >
          {isLoading ? "Asignando..." : "Asignar Usuario"}
        </button>
      </div>
    </form>
  );
}
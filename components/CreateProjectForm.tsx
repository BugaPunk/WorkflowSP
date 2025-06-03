import { useState } from "preact/hooks";
import TextInput from "./TextInput.tsx";

interface CreateProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  currentUserId: number;
}

export default function CreateProjectForm({
  onSuccess,
  onCancel,
  currentUserId,
}: CreateProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    // Validación básica
    if (!name.trim()) {
      setError("El nombre del proyecto es obligatorio");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Llamada a la API para crear el proyecto
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: description || null,
          ownerId: currentUserId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el proyecto");
      }

      // Proyecto creado exitosamente
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear el proyecto");
      console.error("Error creando proyecto:", err);
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
        <TextInput
          label="Nombre del Proyecto"
          id="project-name"
          name="name"
          value={name}
          onChange={(value) => setName(value)}
          required
        />
      </div>

      <div class="mb-6">
        <label for="project-description" class="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="project-description"
          name="description"
          rows={4}
          value={description}
          onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
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
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Crear Proyecto"}
        </button>
      </div>
    </form>
  );
}
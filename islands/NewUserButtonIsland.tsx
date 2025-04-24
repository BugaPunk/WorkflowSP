import { useState } from "preact/hooks";
import UserFormIsland from "./UserFormIsland.tsx";

interface UserData {
  name: string;
  email: string;
  role: string;
  password: string;
}

export default function NewUserButtonIsland() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (userData: UserData) => {
    try {
      // Aquí iría la lógica para enviar los datos al servidor
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Recargar la página para mostrar el nuevo usuario
        window.location.reload();
      } else {
        console.error("Error al crear el usuario");
        // Aquí podrías mostrar un mensaje de error
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <span className="material-symbols-outlined icon-sm">person_add</span>
        Nuevo Usuario
      </button>

      <UserFormIsland 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit} 
      />
    </>
  );
}

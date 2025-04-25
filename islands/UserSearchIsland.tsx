import { useState, useEffect } from "preact/hooks";
import TextInput from "../components/TextInput.tsx";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  formattedRole?: string;
  status?: string;
}

interface UserSearchProps {
  users: User[];
  onSearch: (filteredUsers: User[]) => void;
}

export default function UserSearchIsland({ users, onSearch }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Realizar la búsqueda cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Si el término de búsqueda está vacío, mostrar todos los usuarios
      onSearch(users);
      return;
    }

    // Filtrar usuarios según el término de búsqueda
    const filteredUsers = users.filter((user) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.formattedRole.toLowerCase().includes(searchTermLower)
      );
    });

    onSearch(filteredUsers);
  }, [searchTerm, users]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="material-symbols-outlined text-gray-400">search</span>
      </div>
      <TextInput
        type="search"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por nombre, correo o rol..."
        className="pl-10"
      />
    </div>
  );
}

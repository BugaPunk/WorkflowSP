import { useState } from "preact/hooks";
import UserSearchIsland from "./UserSearchIsland.tsx";
import EditUserFormIsland from "./EditUserFormIsland.tsx";
import DeleteUserConfirmationIsland from "./DeleteUserConfirmationIsland.tsx";
import { formatRole } from "../utils/auth.ts";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  formattedRole?: string;
  status?: string;
}

interface UserTableProps {
  initialUsers: User[];
}

export default function UserTableIsland({ initialUsers }: UserTableProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Estados para los modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Estado para mostrar mensajes de éxito o error
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Calcular usuarios paginados
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Manejar cambio de página
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Manejar búsqueda
  const handleSearch = (searchResults: User[]) => {
    setFilteredUsers(searchResults);
    setCurrentPage(1); // Volver a la primera página cuando se realiza una búsqueda
  };

  // Abrir modal de edición
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Abrir modal de eliminación
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Manejar actualización de usuario
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Actualizar la lista de usuarios
        const updatedUsers = filteredUsers.map(user =>
          user.id === updatedUser.id ? { ...updatedUser, formattedRole: formatRole(updatedUser.role) } : user
        );
        setFilteredUsers(updatedUsers);

        // Mostrar notificación de éxito
        setNotification({
          type: "success",
          message: "Usuario actualizado correctamente"
        });

        // Cerrar el modal
        setIsEditModalOpen(false);

        // Limpiar la notificación después de 3 segundos
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Error al actualizar el usuario"
      });

      // Limpiar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Manejar eliminación de usuario
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users?id=${selectedUser.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Eliminar el usuario de la lista
        const updatedUsers = filteredUsers.filter(user => user.id !== selectedUser.id);
        setFilteredUsers(updatedUsers);

        // Mostrar notificación de éxito
        setNotification({
          type: "success",
          message: "Usuario eliminado correctamente"
        });

        // Cerrar el modal
        setIsDeleteModalOpen(false);

        // Limpiar la notificación después de 3 segundos
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Error al eliminar el usuario"
      });

      // Limpiar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* Notificación */}
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
          'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="material-symbols-outlined">
                {notification.type === 'success' ? 'check_circle' : 'error'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <UserSearchIsland users={initialUsers} onSearch={handleSearch} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correo Electrónico
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'scrum_master' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'product_owner' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.formattedRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(user)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(user)}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No se encontraron usuarios que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{indexOfFirstUser + 1}</span> a{" "}
          <span className="font-medium">
            {Math.min(indexOfLastUser, filteredUsers.length)}
          </span>{" "}
          de <span className="font-medium">{filteredUsers.length}</span> resultados
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined icon-sm">arrow_back</span>
          </button>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined icon-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      <EditUserFormIsland
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateUser}
        user={selectedUser}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteUserConfirmationIsland
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        user={selectedUser}
      />
    </>
  );
}

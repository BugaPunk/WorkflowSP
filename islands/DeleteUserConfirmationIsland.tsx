import ModalIsland from "./ModalIsland.tsx";

interface User {
  id: number;
  name: string;
  email: string;
}

interface DeleteUserConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

export default function DeleteUserConfirmationIsland({
  isOpen,
  onClose,
  onConfirm,
  user
}: DeleteUserConfirmationProps) {
  return (
    <ModalIsland show={isOpen} onClose={onClose} maxWidth="md">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
            <span className="material-symbols-outlined text-red-600">delete</span>
          </div>
          <h2 className="ml-3 text-lg font-medium text-gray-900">Eliminar Usuario</h2>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            ¿Estás seguro de que deseas eliminar al usuario <strong>{user?.name}</strong>? Esta acción no se puede deshacer.
          </p>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Eliminar
          </button>
        </div>
      </div>
    </ModalIsland>
  );
}

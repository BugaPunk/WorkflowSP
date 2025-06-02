import ModalIsland from "./ModalIsland.tsx";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteConfirmationIsland({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmationProps) {
  return (
    <ModalIsland show={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
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

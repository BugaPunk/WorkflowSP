import { useState, useEffect } from "preact/hooks";
import ModalIsland from "./ModalIsland.tsx";
import TextInput from "../components/TextInput.tsx";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  formattedRole?: string;
  status?: string;
}

interface EditUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: User) => void;
  user: User | null;
}

export default function EditUserFormIsland({ isOpen, onClose, onSubmit, user }: EditUserFormProps) {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    role: "team_developer",
    status: "active"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Actualizar el formulario cuando cambia el usuario seleccionado
  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || "active"
      });
      setIsChangingPassword(false);
      setNewPassword("");
    }
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!userData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (isChangingPassword && (!newPassword.trim() || newPassword.length < 6)) {
      newErrors.password = "La nueva contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validateForm()) {
      const dataToSubmit = {
        ...userData
      };

      if (isChangingPassword) {
        // @ts-ignore - Añadir la contraseña solo si se está cambiando
        dataToSubmit.password = newPassword;
      }

      onSubmit(dataToSubmit);
    }
  };

  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    if (!isChangingPassword) {
      setNewPassword("");
    }
  };

  return (
    <ModalIsland show={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Editar Usuario</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <TextInput
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={(value) => setUserData({ ...userData, name: value })}
                error={errors.name}
                placeholder="Ingrese el nombre completo"
                autofocus
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={(value) => setUserData({ ...userData, email: value })}
                error={errors.email}
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={userData.status}
                onChange={(e) => {
                  const target = e.target as HTMLSelectElement;
                  setUserData({ ...userData, status: target.value });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 text-base"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Cambiar contraseña</span>
                <button
                  type="button"
                  onClick={togglePasswordChange}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {isChangingPassword ? "Cancelar" : "Cambiar"}
                </button>
              </div>

              {isChangingPassword && (
                <div className="mt-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <TextInput
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={setNewPassword}
                    error={errors.password}
                    placeholder="Ingrese la nueva contraseña"
                  />
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    El rol del usuario es <strong>{userData.role === "admin" ? "Administrador" :
                                                  userData.role === "scrum_master" ? "Scrum Master" :
                                                  userData.role === "product_owner" ? "Product Owner" :
                                                  "Team Developer"}</strong>.
                    Los roles específicos se asignan cuando se incluyen en un proyecto.
                  </p>
                </div>
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
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </ModalIsland>
  );
}

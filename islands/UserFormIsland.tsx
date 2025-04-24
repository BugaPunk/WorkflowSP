import { useState } from "preact/hooks";
import ModalIsland from "./ModalIsland.tsx";
import TextInput from "../components/TextInput.tsx";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: UserData) => void;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  password: string;
}

export default function UserFormIsland({ isOpen, onClose, onSubmit }: UserFormProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    role: "team_developer",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Función para actualizar el valor del select (rol)
  const handleSelectChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setUserData({
      ...userData,
      [target.name]: target.value,
    });

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[target.name]) {
      setErrors({
        ...errors,
        [target.name]: "",
      });
    }
  };

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

    if (!userData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (userData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(userData);
      // Resetear el formulario
      setUserData({
        name: "",
        email: "",
        role: "team_developer",
        password: "",
      });
      onClose();
    }
  };

  return (
    <ModalIsland show={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Nuevo Usuario</h2>
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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleSelectChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 text-base"
              >
                <option value="admin">Administrador</option>
                <option value="scrum_master">Scrum Master</option>
                <option value="product_owner">Product Owner</option>
                <option value="team_developer">Team Developer</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={(value) => setUserData({ ...userData, password: value })}
                error={errors.password}
                placeholder="Ingrese una contraseña segura"
              />
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </ModalIsland>
  );
}

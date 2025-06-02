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
  // Siempre establecemos el rol como "team_developer"
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    role: "team_developer", // Rol fijo
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Ya no necesitamos la función handleSelectChange porque el rol es fijo

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
              <input type="hidden" name="role" value="team_developer" />
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined">info</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">
                      Todos los usuarios se crean con rol de <strong>Team Developer</strong>. Los roles específicos se asignarán cuando se incluyan en un proyecto.
                    </p>
                  </div>
                </div>
              </div>
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

import { useEffect, useState } from "preact/hooks";

export default function ThemeSwitchIsland() {
  // Estado para controlar si el tema es oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efecto para detectar el tema actual al montar el componente
  useEffect(() => {
    // Verificar si el tema oscuro está aplicado
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
    console.log("ThemeSwitchIsland: Tema inicial detectado:", isDark ? "oscuro" : "claro");
  }, []);

  // Función para cambiar el tema
  const toggleTheme = () => {
    // Obtener el estado actual directamente del DOM
    const currentIsDark = document.documentElement.classList.contains("dark");
    console.log("ThemeSwitchIsland: Cambiando tema. Estado actual:", currentIsDark ? "oscuro" : "claro");

    // Cambiar al tema opuesto
    if (currentIsDark) {
      // Cambiar a tema claro
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("ThemeSwitchIsland: Cambiado a tema claro");
    } else {
      // Cambiar a tema oscuro
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("ThemeSwitchIsland: Cambiado a tema oscuro");
    }

    // Actualizar el estado
    setIsDarkMode(!currentIsDark);

    // Aplicar los estilos inmediatamente
    if (currentIsDark) {
      // Si estamos cambiando a tema claro, forzar los estilos claros
      document.documentElement.style.backgroundColor = "#ffffff";
      document.body.style.backgroundColor = "#ffffff";
      document.querySelectorAll('.bg-gray-50').forEach(el => {
        (el as HTMLElement).style.backgroundColor = "#f9fafb";
      });
      document.querySelectorAll('.bg-white').forEach(el => {
        (el as HTMLElement).style.backgroundColor = "#ffffff";
      });
    } else {
      // Si estamos cambiando a tema oscuro, forzar los estilos oscuros
      document.documentElement.style.backgroundColor = "#1a202c";
      document.body.style.backgroundColor = "#1a202c";
      document.querySelectorAll('.bg-gray-50').forEach(el => {
        (el as HTMLElement).style.backgroundColor = "#1a202c";
      });
      document.querySelectorAll('.bg-white').forEach(el => {
        (el as HTMLElement).style.backgroundColor = "#2d3748";
      });
    }

    // Forzar un refresco de la página para asegurar que todos los estilos se apliquen correctamente
    setTimeout(() => {
      location.reload();
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {isDarkMode ? (
        <span className="material-symbols-outlined text-yellow-500">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-gray-700">dark_mode</span>
      )}
    </button>
  );
}

// Aplicar el tema guardado o el tema del sistema al cargar la página
(function() {
  console.log("Inicializando tema...");

  // Función para aplicar tema oscuro
  function applyDarkTheme() {
    console.log("Aplicando tema oscuro desde script inicial");
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // Aplicar estilos directamente para evitar parpadeos
    document.documentElement.style.backgroundColor = "#1a202c";
    document.documentElement.style.color = "#e2e8f0";

    // Aplicar estilos cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
      document.body.style.backgroundColor = "#1a202c";
      document.body.style.color = "#e2e8f0";
    });
  }

  // Función para aplicar tema claro
  function applyLightTheme() {
    console.log("Aplicando tema claro desde script inicial");
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');

    // Aplicar estilos directamente para evitar parpadeos
    document.documentElement.style.backgroundColor = "#ffffff";
    document.documentElement.style.color = "#1a202c";

    // Aplicar estilos cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#1a202c";
    });
  }

  // Verificar si ya hay una clase dark aplicada
  const isDarkApplied = document.documentElement.classList.contains('dark');
  console.log("¿Tema oscuro ya aplicado?", isDarkApplied);

  // Obtener preferencia guardada
  const savedTheme = localStorage.getItem('theme');
  console.log("Tema guardado:", savedTheme);

  if (savedTheme === 'dark') {
    applyDarkTheme();
  } else if (savedTheme === 'light') {
    applyLightTheme();
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    try {
      const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log("¿Sistema prefiere oscuro?", prefersDark);
      if (prefersDark) {
        applyDarkTheme();
      } else {
        applyLightTheme();
      }
    } catch (error) {
      console.error("Error al detectar preferencia del sistema:", error);
      // Por defecto, usar tema claro
      applyLightTheme();
    }
  }

  // Configurar un observador para cambios en el tema del sistema
  try {
    const darkModeMediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
      console.log("Cambio en preferencia del sistema detectado:", e.matches ? "oscuro" : "claro");
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          applyDarkTheme();
        } else {
          applyLightTheme();
        }
      }
    });
  } catch (error) {
    console.error("Error al configurar observador de tema:", error);
  }

  // Exponer funciones globalmente para depuración
  globalThis.themeDebug = {
    applyDarkTheme,
    applyLightTheme,
    getCurrentTheme: () => localStorage.getItem('theme'),
    isDarkApplied: () => document.documentElement.classList.contains('dark'),
    resetTheme: () => {
      localStorage.removeItem('theme');
      location.reload();
    }
  };
})();

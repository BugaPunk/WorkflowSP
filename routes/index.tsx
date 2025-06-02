export default function Home() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700">
      <div class="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div class="text-center text-white mb-16">
          <h1 class="text-5xl font-bold mb-6">
            Bienvenido a WorkflowS
          </h1>
          <p class="text-xl mb-8">
            Plataforma de gestión de proyectos académicos basada en Scrum
            para la Universidad La Salle
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="/auth/login"
              class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Iniciar Sesión
            </a>
            <a
              href="/auth/register"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-blue-600"
            >
              Registrarse
            </a>
            <a
              href="/about"
              class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Conocer más
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div class="text-4xl mb-4">👨‍🏫</div>
            <h3 class="text-xl font-semibold mb-2">Para Docentes</h3>
            <p class="text-white/80">
              Gestiona equipos, evalúa proyectos y realiza seguimiento del progreso
              de tus estudiantes de manera eficiente.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-xl font-semibold mb-2">Para Estudiantes</h3>
            <p class="text-white/80">
              Colabora en equipo, gestiona sprints y mantén un registro claro de
              tus tareas y entregables.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold mb-2">Metodología Scrum</h3>
            <p class="text-white/80">
              Aprende y aplica Scrum en tus proyectos académicos con herramientas
              especialmente diseñadas para el entorno educativo.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div class="text-center text-white/90">
          <h2 class="text-2xl font-semibold mb-4">
            Universidad La Salle
          </h2>
          <p class="max-w-2xl mx-auto">
            Una plataforma diseñada para mejorar la gestión de proyectos académicos,
            facilitando la colaboración entre docentes y estudiantes.
          </p>
        </div>
      </div>
    </div>
  );
}

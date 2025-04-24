import { Head } from "$fresh/runtime.ts";

export default function About() {
  return (
    <>
      <Head>
        <title>Acerca de - WorkflowS</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700">
        <div class="max-w-6xl mx-auto px-4 py-16">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
              Acerca de WorkflowS
            </h1>
            <p class="text-lg text-gray-700 mb-6">
              WorkflowS es una plataforma de gestión de proyectos académicos basada en la metodología Scrum, 
              diseñada específicamente para la Universidad La Salle.
            </p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Nuestra Misión
            </h2>
            <p class="text-lg text-gray-700 mb-6">
              Facilitar la colaboración entre docentes y estudiantes en el desarrollo de proyectos académicos, 
              proporcionando herramientas que permitan aplicar la metodología Scrum de manera efectiva en el entorno educativo.
            </p>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Características Principales
            </h2>
            <ul class="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
              <li>Gestión de equipos y roles (Scrum Master, Product Owner, Team Developer)</li>
              <li>Planificación y seguimiento de sprints</li>
              <li>Asignación y monitoreo de tareas</li>
              <li>Evaluación de entregables</li>
              <li>Retroalimentación continua</li>
            </ul>
            
            <div class="mt-8 text-center">
              <a
                href="/"
                class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Flame,
  Wind,
  Shield,
  BookOpen,
  Award
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'interactive' | 'quiz';
  completed: boolean;
  icon: any;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Prevención de Fugas de Gas',
    description: 'Aprende a identificar y actuar ante una posible fuga de gas en la cocina',
    duration: '5 min',
    type: 'interactive',
    completed: true,
    icon: Wind
  },
  {
    id: 2,
    title: 'Seguridad con Fuego',
    description: 'Técnicas básicas para prevenir incendios en la cocina',
    duration: '7 min',
    type: 'video',
    completed: true,
    icon: Flame
  },
  {
    id: 3,
    title: 'Uso Seguro de Electrodomésticos',
    description: 'Buenas prácticas para el uso de horno, estufa y otros equipos',
    duration: '6 min',
    type: 'interactive',
    completed: false,
    icon: Shield
  },
  {
    id: 4,
    title: 'Simulacro de Emergencia',
    description: 'Practica los pasos a seguir en caso de emergencia real',
    duration: '10 min',
    type: 'interactive',
    completed: false,
    icon: AlertTriangle
  },
  {
    id: 5,
    title: 'Evaluación Final',
    description: 'Pon a prueba tus conocimientos con este quiz interactivo',
    duration: '8 min',
    type: 'quiz',
    completed: false,
    icon: Award
  }
];

export default function TrainingMode() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const completedLessons = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const simulationSteps = [
    {
      title: 'Detectar el Problema',
      description: 'El sensor ha detectado una fuga de gas. ¿Cuál es tu primera acción?',
      options: [
        'Encender la ventilación',
        'Cerrar inmediatamente la llave de gas',
        'Abrir ventanas y puertas',
        'Llamar al servicio de emergencia'
      ],
      correct: 1,
      explanation: 'Lo primero es cerrar la fuente del gas para detener la fuga.'
    },
    {
      title: 'Ventilar el Área',
      description: 'Después de cerrar el gas, ¿qué debes hacer?',
      options: [
        'Encender las luces',
        'Abrir ventanas y puertas',
        'Usar ventiladores eléctricos',
        'Revisar otros electrodomésticos'
      ],
      correct: 1,
      explanation: 'Ventilar naturalmente es la forma más segura de dispersar el gas.'
    },
    {
      title: 'Buscar Ayuda',
      description: 'Una vez que el área está ventilada, ¿cuál es el siguiente paso?',
      options: [
        'Intentar reparar la fuga tú mismo',
        'Contactar a un técnico especializado',
        'Ignorar si ya no huele a gas',
        'Volver a encender el gas para probar'
      ],
      correct: 1,
      explanation: 'Siempre busca ayuda profesional para reparaciones de gas.'
    }
  ];

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepComplete = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Modo Entrenamiento</h2>
            <p className="text-emerald-100">Mejora tus conocimientos sobre seguridad en la cocina</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{completedLessons}/{lessons.length}</div>
            <div className="text-sm text-emerald-100">Lecciones completadas</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-emerald-100 mt-2">{progressPercentage.toFixed(0)}% completado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lecciones Disponibles</h3>
            <div className="space-y-3">
              {lessons.map((lesson) => {
                const Icon = lesson.icon;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedLesson?.id === lesson.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {lesson.completed ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lesson.type === 'video' ? 'bg-blue-100 text-blue-800' :
                            lesson.type === 'quiz' ? 'bg-purple-100 text-purple-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {lesson.type === 'video' ? 'Video' :
                             lesson.type === 'quiz' ? 'Quiz' : 'Interactivo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedLesson.title}</h3>
                  <p className="text-gray-600">{selectedLesson.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Simulation Content */}
              {selectedLesson.type === 'interactive' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <h4 className="text-lg font-semibold text-red-800">Simulacro de Emergencia</h4>
                    </div>
                    <p className="text-red-700">
                      Esta es una simulación. En una emergencia real, siempre prioriza tu seguridad y llama a los servicios de emergencia.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Paso {currentStep + 1} de {simulationSteps.length}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(((currentStep + 1) / simulationSteps.length) * 100)}% completado
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentStep + 1) / simulationSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {simulationSteps[currentStep].title}
                      </h4>
                      <p className="text-gray-700">{simulationSteps[currentStep].description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {simulationSteps[currentStep].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={handleStepComplete}
                            className={`p-4 text-left rounded-lg border-2 transition-all ${
                              index === simulationSteps[currentStep].correct
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                            {option}
                          </button>
                        ))}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Explicación</span>
                        </div>
                        <p className="text-blue-700">{simulationSteps[currentStep].explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Content Placeholder */}
              {selectedLesson.type === 'video' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                      <p className="text-lg">Video de Entrenamiento</p>
                      <p className="text-sm opacity-70">Duración: {selectedLesson.duration}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Puntos Clave</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Siempre mantén la cocina ventilada</li>
                      <li>• Revisa regularmente las conexiones de gas</li>
                      <li>• Nunca dejes fuegos sin supervisión</li>
                      <li>• Conoce la ubicación de las llaves de cierre</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Quiz Content */}
              {selectedLesson.type === 'quiz' && (
                <div className="space-y-6">
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Quiz de Evaluación</h4>
                    <p className="text-gray-600 mb-4">Completa las lecciones anteriores para desbloquear el quiz final</p>
                    <button 
                      disabled={completedLessons < lessons.length - 1}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Iniciar Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una Lección</h3>
              <p className="text-gray-600">Elige una lección de la lista para comenzar tu entrenamiento en seguridad</p>
            </div>
          )}
        </div>
      </div>

      {/* Achievement Badge */}
      {progressPercentage === 100 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-4">
            <Award className="h-12 w-12" />
            <div>
              <h3 className="text-xl font-bold">¡Felicitaciones!</h3>
              <p>Has completado todo el programa de entrenamiento en seguridad</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
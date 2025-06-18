import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

// Mock data for charts
const sensorReadingsData = [
  { time: '00:00', gas: 20, temperatura: 25, magnetico: 0 },
  { time: '02:00', gas: 22, temperatura: 24, magnetico: 1 },
  { time: '04:00', gas: 18, temperatura: 23, magnetico: 0 },
  { time: '06:00', gas: 25, temperatura: 28, magnetico: 0 },
  { time: '08:00', gas: 35, temperatura: 45, magnetico: 1 },
  { time: '10:00', gas: 42, temperatura: 52, magnetico: 0 },
  { time: '12:00', gas: 65, temperatura: 68, magnetico: 1 },
  { time: '14:00', gas: 38, temperatura: 42, magnetico: 0 },
  { time: '16:00', gas: 28, temperatura: 35, magnetico: 0 },
  { time: '18:00', gas: 55, temperatura: 62, magnetico: 1 },
  { time: '20:00', gas: 45, temperatura: 48, magnetico: 0 },
  { time: '22:00', gas: 30, temperatura: 32, magnetico: 0 },
];

const weeklyAlertsData = [
  { day: 'Lun', alerts: 2 },
  { day: 'Mar', alerts: 5 },
  { day: 'Mie', alerts: 1 },
  { day: 'Jue', alerts: 8 },
  { day: 'Vie', alerts: 3 },
  { day: 'Sab', alerts: 1 },
  { day: 'Dom', alerts: 0 },
];

const alertTypeData = [
  { name: 'Fuga de Gas', value: 12, color: '#EF4444' },
  { name: 'Temperatura Alta', value: 8, color: '#F59E0B' },
  { name: 'Puerta Abierta', value: 15, color: '#3B82F6' },
  { name: 'Otros', value: 3, color: '#6B7280' },
];

export default function History() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedChart, setSelectedChart] = useState<'readings' | 'alerts' | 'types'>('readings');

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Historial e Informes</h2>
            <p className="text-gray-600">Análisis de patrones y tendencias de seguridad</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Última semana</option>
              <option value="30d">Último mes</option>
              <option value="90d">Últimos 3 meses</option>
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedChart('readings')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedChart === 'readings'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lecturas
              </button>
              <button
                onClick={() => setSelectedChart('alerts')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedChart === 'alerts'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Alertas
              </button>
              <button
                onClick={() => setSelectedChart('types')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedChart === 'types'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tipos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Activity className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Lecturas</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+12% vs semana anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Alertas</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
              <p className="text-sm text-red-600">+5% vs semana anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa Resolución</p>
              <p className="text-2xl font-bold text-gray-900">94.7%</p>
              <p className="text-sm text-green-600">+2.1% vs semana anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-gray-900">8.5m</p>
              <p className="text-sm text-green-600">-15% vs semana anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedChart === 'readings' && 'Lecturas de Sensores por Hora'}
            {selectedChart === 'alerts' && 'Alertas por Día de la Semana'}
            {selectedChart === 'types' && 'Distribución de Tipos de Alerta'}
          </h3>
        </div>

        <div className="h-80">
          {selectedChart === 'readings' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorReadingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="gas" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Gas (ppm)"
                />
                <Line 
                  type="monotone" 
                  dataKey="temperatura" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Temperatura (°C)"
                />
                <Line 
                  type="monotone" 
                  dataKey="magnetico" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Magnético"
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'alerts' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAlertsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="alerts" 
                  fill="#10B981"
                  name="Alertas"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'types' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                >
                  {alertTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patrones Detectados</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Pico de actividad martes</p>
                <p className="text-sm text-gray-600">
                  Se detecta un aumento del 40% en las alertas los martes entre 12:00-14:00
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Uso frecuente horno</p>
                <p className="text-sm text-gray-600">
                  El sensor magnético del horno se activa promedio 8 veces por día
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Mejora en seguridad</p>
                <p className="text-sm text-gray-600">
                  Las alertas de gas han disminuido 25% en el último mes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h4 className="font-medium text-gray-900">Configurar recordatorio</h4>
              <p className="text-sm text-gray-600 mt-1">
                Considera configurar un recordatorio para revisar el horno después de 10 minutos de uso
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">Calibrar sensor de gas</h4>
              <p className="text-sm text-gray-600 mt-1">
                El sensor de gas muestra lecturas variables. Una calibración podría mejorar la precisión
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-gray-900">Revisar ventilación</h4>
              <p className="text-sm text-gray-600 mt-1">
                Los picos de temperatura podrían reducirse mejorando la ventilación de la cocina
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
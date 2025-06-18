import React from 'react';
import { 
  Thermometer, 
  Wind, 
  DoorOpen, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Shield
} from 'lucide-react';
import { useData } from '../context/DataContext';

const getSensorIcon = (type: string) => {
  switch (type) {
    case 'gas': return Wind;
    case 'temperatura': return Thermometer;
    case 'magnetico': return DoorOpen;
    default: return Activity;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal': return 'text-green-600 bg-green-100';
    case 'warning': return 'text-yellow-600 bg-yellow-100';
    case 'danger': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'normal': return 'Normal';
    case 'warning': return 'Advertencia';
    case 'danger': return 'Peligro';
    default: return 'Desconocido';
  }
};

export default function Dashboard() {
  const { device, sensors, alerts } = useData();

  const activeAlerts = alerts.filter(alert => alert.status === 'activa');
  const deviceStatus = sensors.some(s => s.status === 'danger') ? 'danger' : 
                     sensors.some(s => s.status === 'warning') ? 'warning' : 'normal';

  if (!device) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay dispositivo configurado</h3>
          <p className="text-gray-600">Configure un dispositivo para comenzar el monitoreo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${getStatusColor(deviceStatus)}`}>
              <Shield className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estado General</p>
              <p className="text-2xl font-semibold text-gray-900">
                {getStatusText(deviceStatus)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alertas Activas</p>
              <p className="text-2xl font-semibold text-gray-900">{activeAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Activity className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sensores Activos</p>
              <p className="text-2xl font-semibold text-gray-900">{sensors.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Alertas Activas</h3>
          </div>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                    <p className="text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Sensor: {alert.sensor?.name}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.severity === 'high' ? 'Alta' : 
                     alert.severity === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sensors Grid */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Estado de Sensores - {device.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor) => {
            const SensorIcon = getSensorIcon(sensor.type);
            return (
              <div key={sensor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(sensor.status)}`}>
                    <SensorIcon className="h-5 w-5" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                    {getStatusText(sensor.status)}
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{sensor.name}</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valor actual:</span>
                    <span className="text-sm font-medium">
                      {sensor.currentValue?.toFixed(1)} {sensor.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Límite:</span>
                    <span className="text-sm font-medium">
                      {sensor.threshold} {sensor.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Última lectura:</span>
                    <span className="text-sm font-medium">
                      {sensor.lastReading ? new Date(sensor.lastReading).toLocaleTimeString() : 'N/A'}
                    </span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        sensor.status === 'danger' ? 'bg-red-500' :
                        sensor.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min((sensor.currentValue || 0) / sensor.threshold * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sensors.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No hay sensores configurados</h4>
            <p className="text-gray-600">Configure sensores para este dispositivo para comenzar el monitoreo.</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                alert.status === 'activa' ? 'bg-red-100 text-red-600' :
                alert.status === 'resuelta' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {alert.status === 'activa' ? <AlertTriangle className="h-4 w-4" /> :
                 alert.status === 'resuelta' ? <CheckCircle className="h-4 w-4" /> :
                 <Clock className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                <p className="text-xs text-gray-500">
                  {alert.notifiedAt ? new Date(alert.notifiedAt).toLocaleString() : 'Sin fecha'}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                alert.status === 'activa' ? 'bg-red-100 text-red-800' :
                alert.status === 'resuelta' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {alert.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
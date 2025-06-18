import React, { useState } from 'react';
import { 
  Save, 
  Bell, 
  Smartphone, 
  Mail, 
  Phone,
  Sliders,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Settings() {
  const { device, sensors } = useData();
  const [activeTab, setActiveTab] = useState<'device' | 'notifications' | 'sensors'>('device');
  const [settings, setSettings] = useState({
    deviceName: device?.name || '',
    notificationMethod: 'email',
    smsEnabled: false,
    callEnabled: false,
    emailEnabled: true,
    pushEnabled: true,
    repetitionDelay: 5,
    maxOpenTime: 10,
    gasThreshold: 50,
    temperatureThreshold: 80
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Here would be the API call to save settings
    console.log('Saving settings:', settings);
    // Show success message
  };

  const tabs = [
    { id: 'device', name: 'Dispositivo', icon: Sliders },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'sensors', name: 'Sensores', icon: Edit }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Configuración</h2>
        <p className="text-gray-600">Personaliza la configuración de tu dispositivo y notificaciones</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Device Settings */}
          {activeTab === 'device' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración del Dispositivo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Dispositivo
                    </label>
                    <input
                      type="text"
                      value={settings.deviceName}
                      onChange={(e) => handleSettingChange('deviceName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Ej: Mi Cocina"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo máximo puerta abierta (minutos)
                    </label>
                    <input
                      type="number"
                      value={settings.maxOpenTime}
                      onChange={(e) => handleSettingChange('maxOpenTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="1"
                      max="60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Umbral de Gas (ppm)
                    </label>
                    <input
                      type="number"
                      value={settings.gasThreshold}
                      onChange={(e) => handleSettingChange('gasThreshold', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="10"
                      max="100"
                    />
                    <p className="text-sm text-gray-500 mt-1">Nivel de gas que activará una alerta</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Umbral de Temperatura (°C)
                    </label>
                    <input
                      type="number"
                      value={settings.temperatureThreshold}
                      onChange={(e) => handleSettingChange('temperatureThreshold', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="50"
                      max="150"
                    />
                    <p className="text-sm text-gray-500 mt-1">Temperatura que activará una alerta</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Notificaciones</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retraso entre repeticiones (minutos)
                    </label>
                    <input
                      type="number"
                      value={settings.repetitionDelay}
                      onChange={(e) => handleSettingChange('repetitionDelay', parseInt(e.target.value))}
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="1"
                      max="30"
                    />
                    <p className="text-sm text-gray-500 mt-1">Tiempo entre notificaciones repetidas</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Canales de Notificación</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Correo Electrónico</p>
                            <p className="text-sm text-gray-500">Recibir alertas por email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailEnabled}
                            onChange={(e) => handleSettingChange('emailEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">Notificaciones Push</p>
                            <p className="text-sm text-gray-500">Alertas instantáneas en tu dispositivo</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.pushEnabled}
                            onChange={(e) => handleSettingChange('pushEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-gray-900">SMS</p>
                            <p className="text-sm text-gray-500">Mensajes de texto para alertas críticas</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.smsEnabled}
                            onChange={(e) => handleSettingChange('smsEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900">Llamada de Voz</p>
                            <p className="text-sm text-gray-500">Llamadas automáticas para emergencias</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.callEnabled}
                            onChange={(e) => handleSettingChange('callEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sensors Settings */}
          {activeTab === 'sensors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Configuración de Sensores</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Agregar Sensor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{sensor.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{sensor.type}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del Sensor
                        </label>
                        <input
                          type="text"
                          defaultValue={sensor.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Umbral de Alerta
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            defaultValue={sensor.threshold}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <span className="text-sm text-gray-500">{sensor.unit}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sensor.status === 'normal' ? 'bg-green-100 text-green-800' :
                          sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sensor.status === 'normal' ? 'Normal' :
                           sensor.status === 'warning' ? 'Advertencia' : 'Peligro'}
                        </span>
                        <button className="px-3 py-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          Calibrar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sensors.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <Sliders className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No hay sensores configurados</h4>
                  <p className="text-gray-600 mb-4">Agrega sensores para comenzar el monitoreo</p>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Agregar Primer Sensor
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>Guardar Configuración</span>
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Alert } from '../types';

export default function AlertsPanel() {
  const { alerts, updateAlertStatus } = useData();
  const [filter, setFilter] = useState<'all' | 'activa' | 'resuelta' | 'falsa_alarma'>('all');
  const [search, setSearch] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.status === filter;
    const matchesSearch = alert.type.toLowerCase().includes(search.toLowerCase()) ||
                         alert.message.toLowerCase().includes(search.toLowerCase()) ||
                         alert.sensor?.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getAlertIcon = (status: string) => {
    switch (status) {
      case 'activa': return AlertTriangle;
      case 'resuelta': return CheckCircle;
      case 'falsa_alarma': return Clock;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (status: string) => {
    switch (status) {
      case 'activa': return 'text-red-600 bg-red-100';
      case 'resuelta': return 'text-green-600 bg-green-100';
      case 'falsa_alarma': return 'text-gray-600 bg-gray-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (alertId: number, newStatus: Alert['status']) => {
    updateAlertStatus(alertId, newStatus);
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Alertas</h2>
            <p className="text-gray-600">Monitorea y gestiona todas las alertas del sistema</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alertas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Todas</option>
                <option value="activa">Activas</option>
                <option value="resuelta">Resueltas</option>
                <option value="falsa_alarma">Falsas Alarmas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: alerts.length, color: 'bg-blue-100 text-blue-800' },
          { label: 'Activas', count: alerts.filter(a => a.status === 'activa').length, color: 'bg-red-100 text-red-800' },
          { label: 'Resueltas', count: alerts.filter(a => a.status === 'resuelta').length, color: 'bg-green-100 text-green-800' },
          { label: 'Falsas Alarmas', count: alerts.filter(a => a.status === 'falsa_alarma').length, color: 'bg-gray-100 text-gray-800' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                {stat.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Alertas ({filteredAlerts.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No hay alertas</h4>
              <p className="text-gray-600">No se encontraron alertas que coincidan con los filtros seleccionados.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.status);
              return (
                <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getAlertColor(alert.status)}`}>
                        <AlertIcon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{alert.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity === 'high' ? 'Alta' : alert.severity === 'medium' ? 'Media' : 'Baja'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getAlertColor(alert.status)}`}>
                            {alert.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{alert.message}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Sensor:</span> {alert.sensor?.name || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Notificada:</span>{' '}
                            {alert.notifiedAt ? new Date(alert.notifiedAt).toLocaleString() : 'N/A'}
                          </div>
                          {alert.resolvedAt && (
                            <div>
                              <span className="font-medium">Resuelta:</span>{' '}
                              {new Date(alert.resolvedAt).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      
                      {selectedAlert?.id === alert.id && (
                        <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-10 min-w-[160px]">
                          {alert.status === 'activa' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(alert.id, 'resuelta')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Marcar como resuelta
                              </button>
                              <button
                                onClick={() => handleStatusChange(alert.id, 'falsa_alarma')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Marcar como falsa alarma
                              </button>
                            </>
                          )}
                          {alert.status !== 'activa' && (
                            <button
                              onClick={() => handleStatusChange(alert.id, 'activa')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Reactivar alerta
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Device, Sensor, Alert, SensorReading } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  device: Device | null;
  sensors: Sensor[];
  alerts: Alert[];
  readings: SensorReading[];
  updateAlertStatus: (alertId: number, status: Alert['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data for demonstration
const mockDevices: Device[] = [
  {
    id: 1,
    name: 'Mi Cocina',
    userId: 1,
    apiKey: 'api_key_123',
    createdAt: new Date('2024-01-15'),
    status: 'online'
  },
  {
    id: 2,
    name: 'Mi Cocina',
    userId: 2,
    apiKey: 'api_key_456',
    createdAt: new Date('2024-01-20'),
    status: 'warning'
  }
];

const mockSensors: Sensor[] = [
  {
    id: 1,
    deviceId: 1,
    type: 'gas',
    name: 'Sensor de Gas Estufa',
    unit: 'ppm',
    threshold: 50,
    currentValue: 25,
    status: 'normal',
    lastReading: new Date()
  },
  {
    id: 2,
    deviceId: 1,
    type: 'temperatura',
    name: 'Sensor Temperatura',
    unit: '°C',
    threshold: 80,
    currentValue: 45,
    status: 'normal',
    lastReading: new Date()
  },
  {
    id: 3,
    deviceId: 1,
    type: 'magnetico',
    name: 'Sensor Puerta Horno',
    unit: 'estado',
    threshold: 1,
    currentValue: 0,
    status: 'normal',
    lastReading: new Date()
  },
  {
    id: 4,
    deviceId: 2,
    type: 'gas',
    name: 'Detector Gas Principal',
    unit: 'ppm',
    threshold: 50,
    currentValue: 35,
    status: 'normal',
    lastReading: new Date()
  },
  {
    id: 5,
    deviceId: 2,
    type: 'temperatura',
    name: 'Sensor Temperatura Horno',
    unit: '°C',
    threshold: 80,
    currentValue: 65,
    status: 'warning',
    lastReading: new Date()
  }
];

const mockAlerts: Alert[] = [
  {
    id: 1,
    readingId: 123,
    type: 'Fuga de Gas',
    status: 'resuelta',
    message: 'Nivel de gas por encima del límite seguro',
    notifiedAt: new Date(Date.now() - 86400000),
    resolvedAt: new Date(Date.now() - 3600000),
    severity: 'high',
    sensor: mockSensors[0]
  },
  {
    id: 2,
    readingId: 124,
    type: 'Temperatura Alta',
    status: 'activa',
    message: 'Temperatura excesiva detectada en el horno',
    notifiedAt: new Date(),
    severity: 'medium',
    sensor: mockSensors[1]
  },
  {
    id: 3,
    readingId: 125,
    type: 'Puerta Abierta',
    status: 'falsa_alarma',
    message: 'Horno abierto por tiempo prolongado',
    notifiedAt: new Date(Date.now() - 172800000),
    resolvedAt: new Date(Date.now() - 172000000),
    severity: 'low',
    sensor: mockSensors[2]
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [device, setDevice] = useState<Device | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [readings, setReadings] = useState<SensorReading[]>([]);

  // Load user's device and data when user changes
  useEffect(() => {
    if (user) {
      const userDevice = mockDevices.find(d => d.userId === user.id);
      setDevice(userDevice || null);
      
      if (userDevice) {
        const deviceSensors = mockSensors.filter(s => s.deviceId === userDevice.id);
        setSensors(deviceSensors);
        
        // Filter alerts for user's sensors
        const deviceAlerts = mockAlerts.filter(alert => 
          deviceSensors.some(sensor => sensor.id === alert.sensor?.id)
        );
        setAlerts(deviceAlerts);
      }
    } else {
      setDevice(null);
      setSensors([]);
      setAlerts([]);
    }
  }, [user]);

  const updateAlertStatus = (alertId: number, status: Alert['status']) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status, resolvedAt: status !== 'activa' ? new Date() : undefined }
        : alert
    ));
  };

  // Simulate real-time updates
  useEffect(() => {
    if (sensors.length === 0) return;

    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => {
        const newValue = sensor.type === 'gas' 
          ? Math.random() * 100
          : sensor.type === 'temperatura'
          ? 20 + Math.random() * 60
          : Math.round(Math.random());
        
        const newStatus = newValue > sensor.threshold ? 'danger' : 
                         newValue > sensor.threshold * 0.8 ? 'warning' : 'normal';

        return {
          ...sensor,
          currentValue: newValue,
          status: newStatus,
          lastReading: new Date()
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [sensors.length]);

  return (
    <DataContext.Provider value={{
      device,
      sensors,
      alerts,
      readings,
      updateAlertStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
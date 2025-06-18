export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: Date;
}

export interface Device {
  id: number;
  name: string;
  userId: number;
  apiKey: string;
  createdAt: Date;
  status: 'online' | 'offline' | 'warning';
}

export interface Sensor {
  id: number;
  deviceId: number;
  type: 'gas' | 'temperatura' | 'magnetico';
  name: string;
  unit: string;
  threshold: number;
  currentValue?: number;
  status: 'normal' | 'warning' | 'danger';
  lastReading?: Date;
}

export interface SensorReading {
  id: number;
  sensorId: number;
  value: number;
  createdAt: Date;
}

export interface Alert {
  id: number;
  readingId: number;
  type: string;
  status: 'activa' | 'resuelta' | 'falsa_alarma';
  message: string;
  notifiedAt?: Date;
  resolvedAt?: Date;
  sensor?: Sensor;
  severity: 'low' | 'medium' | 'high';
}

export interface Notification {
  id: number;
  alertId: number;
  userId: number;
  channel: 'email' | 'push' | 'sms' | 'call';
  status: 'enviada' | 'fallida' | 'leida';
  sentAt?: Date;
}

export interface Settings {
  id: number;
  deviceId: number;
  notificationMethod: string;
  smsEnabled: boolean;
  callEnabled: boolean;
  repetitionDelay: number;
  maxOpenTime: number;
  gasThreshold: number;
  temperatureThreshold: number;
}
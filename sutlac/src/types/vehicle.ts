export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  driverName: string;
  status: "active" | "idle" | "maintenance";
}

export interface TelemetryReading {
  gps: { lat: number; lng: number };
  speed: number;
  temperature: number;
}

export interface VehicleTelemetry {
  vehicleId: string;
  gps: { lat: number; lng: number };
  speed: number;
  temperature: number;
  lastUpdate: string;
}

// Vehicle types matching the real API response
export type VehicleType = "CAR" | "TRUCK" | "VAN" | "BUS";

// Base vehicle from API (GET /api/feel-tracking/list/)
export interface Vehicle {
  id?: string; // Some APIs may not return id
  vehicle_plate: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
  create_date?: string;
  update_date?: string;
}

// For creating a new vehicle
export interface VehicleCreate {
  vehicle_plate: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
}

// Telemetry data (still mock for now)
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

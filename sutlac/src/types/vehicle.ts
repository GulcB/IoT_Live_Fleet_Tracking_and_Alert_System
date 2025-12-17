export type VehicleType = "CAR" | "TRUCK" | "VAN" | "BUS";
export type VehicleStatus = "moving" | "idle" | "stopped" | "in_garage";

export interface Vehicle {
  id: string;
  vehicle_plate: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
  status: VehicleStatus;
  last_seen?: string;
  speed?: number;
  temperature?: number;
  active_alarms?: number;
  driver_name?: string;
}

export interface VehicleCreate {
  vehicle_plate: string;
  brand: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  page_size: number;
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

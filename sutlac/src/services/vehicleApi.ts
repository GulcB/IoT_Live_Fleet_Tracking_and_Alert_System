import type {
  Vehicle,
  VehicleCreate,
  VehicleTelemetry,
  TelemetryReading,
  VehicleListResponse,
} from "../types/vehicle";

const API_BASE_URL = "http://localhost:8000";

export const vehicleApi = {
  addVehicle: async (data: VehicleCreate): Promise<Vehicle> => {
    const response = await fetch(`${API_BASE_URL}/feel-tracking/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to add vehicle: ${response.statusText}`);
    }

    return response.json();
  },

  updateVehicle: async (id: string, data: Partial<VehicleCreate>): Promise<Vehicle> => {
    const response = await fetch(`${API_BASE_URL}/feel-tracking/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update vehicle: ${response.statusText}`);
    }

    return response.json();
  },

  deleteVehicle: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/feel-tracking/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete vehicle: ${response.statusText}`);
    }
  },

  getVehicles: async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<VehicleListResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/feel-tracking/list/?page=${page}&page_size=${pageSize}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch vehicles: ${response.statusText}`);
      }

      return response.json();
    } catch {
      // Fallback to mock data if backend is not available
      return getMockVehicles(page, pageSize);
    }
  },

  getVehicleById: async (id: string): Promise<Vehicle | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/feel-tracking/${id}/`);

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch {
      return null;
    }
  },

  getVehicleTelemetry: async (
    vehicleId: string
  ): Promise<VehicleTelemetry | null> => {
    // TODO: Replace with real API call when available
    const mockReadings: Record<string, TelemetryReading[]> = {
      "1": [
        { gps: { lat: 41.0082, lng: 28.9784 }, speed: 65, temperature: -18 },
      ],
      "2": [
        { gps: { lat: 41.0152, lng: 28.9795 }, speed: 82, temperature: -20 },
      ],
    };

    const readings = mockReadings[vehicleId];
    if (!readings || readings.length === 0) return null;

    return {
      vehicleId,
      gps: readings[0].gps,
      speed: readings[0].speed,
      temperature: readings[0].temperature,
      lastUpdate: new Date().toISOString(),
    };
  },
};

// Mock data fallback
const getMockVehicles = (
  page: number,
  pageSize: number
): VehicleListResponse => {
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      vehicle_plate: "NYC-4029",
      brand: "Volvo",
      model: "FH16",
      year: 2022,
      vehicle_type: "TRUCK",
      status: "moving",
      last_seen: "Just now",
      speed: 65,
      temperature: -18,
      active_alarms: 0,
    },
    {
      id: "2",
      vehicle_plate: "CAL-9281",
      brand: "Scania",
      model: "R500",
      year: 2021,
      vehicle_type: "TRUCK",
      status: "moving",
      last_seen: "2 mins ago",
      speed: 82,
      temperature: -20,
      active_alarms: 0,
    },
    {
      id: "3",
      vehicle_plate: "TEX-1102",
      brand: "Mercedes",
      model: "Actros",
      year: 2020,
      vehicle_type: "TRUCK",
      status: "stopped",
      last_seen: "15 mins ago",
      speed: 0,
      temperature: -5,
      active_alarms: 2,
      driver_name: "Engine Overheat",
    },
    {
      id: "4",
      vehicle_plate: "FLA-5591",
      brand: "Mercedes",
      model: "Actros",
      year: 2019,
      vehicle_type: "TRUCK",
      status: "idle",
      last_seen: "45 mins ago",
      speed: 0,
      temperature: -18,
      active_alarms: 0,
    },
    {
      id: "5",
      vehicle_plate: "NEV-8821",
      brand: "Kenworth",
      model: "T680",
      year: 2023,
      vehicle_type: "TRUCK",
      status: "moving",
      last_seen: "1 hour ago",
      speed: 90,
      temperature: -12,
      active_alarms: 0,
    },
  ];

  const start = (page - 1) * pageSize;
  const paginatedVehicles = mockVehicles.slice(start, start + pageSize);

  return {
    vehicles: paginatedVehicles,
    total: mockVehicles.length,
    page,
    page_size: pageSize,
  };
};

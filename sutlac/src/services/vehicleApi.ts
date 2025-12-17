import type {
  Vehicle,
  VehicleCreate,
  VehicleTelemetry,
  TelemetryReading,
} from "../types/vehicle";

const API_BASE_URL = "http://localhost:8000";

// Track current index per vehicle for cycling through mock telemetry data
const vehicleIndexMap: Record<string, number> = {};

// Mock telemetry data (will be replaced when telemetry API is ready)
const mockTelemetryData: Record<string, TelemetryReading[]> = {
  default: [
    { gps: { lat: 41.0082, lng: 28.9784 }, speed: 65, temperature: -18 },
    { gps: { lat: 41.0092, lng: 28.9794 }, speed: 70, temperature: -17 },
    { gps: { lat: 41.0102, lng: 28.9804 }, speed: 68, temperature: -18 },
    { gps: { lat: 41.0112, lng: 28.9814 }, speed: 72, temperature: -19 },
    { gps: { lat: 41.0122, lng: 28.9824 }, speed: 75, temperature: -18 },
  ],
};

export const vehicleApi = {
  /**
   * Fetch all vehicles from the real API
   * GET http://localhost:8000/api/feel-tracking/list/
   */
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await fetch(`${API_BASE_URL}/api/feel-tracking/list/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Vehicle[];
  },

  /**
   * Add a new vehicle
   * POST http://localhost:8000/api/feel-tracking/add/
   */
  addVehicle: async (data: VehicleCreate): Promise<Vehicle> => {
    const response = await fetch(`${API_BASE_URL}/api/feel-tracking/add/`, {
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

  /**
   * Update an existing vehicle
   */
  updateVehicle: async (
    id: string,
    data: Partial<VehicleCreate>
  ): Promise<Vehicle> => {
    const response = await fetch(`${API_BASE_URL}/api/feel-tracking/detail/${id}/`, {
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

  /**
   * Delete a vehicle
   */
  deleteVehicle: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/feel-tracking/detail/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete vehicle: ${response.statusText}`);
    }
  },

  /**
   * Get telemetry for a vehicle (still uses mock data)
   * Will be replaced when telemetry API is ready
   */
  getVehicleTelemetry: async (
    vehiclePlate: string
  ): Promise<VehicleTelemetry | null> => {
    // Simulate small delay for realistic behavior
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Use default mock data for any vehicle
    const readings = mockTelemetryData["default"];
    if (!readings || readings.length === 0) return null;

    // Get current index and cycle through readings
    if (!(vehiclePlate in vehicleIndexMap)) {
      vehicleIndexMap[vehiclePlate] = 0;
    }

    const currentIndex = vehicleIndexMap[vehiclePlate];
    const reading = readings[currentIndex];

    // Move to next reading (loop back to start)
    vehicleIndexMap[vehiclePlate] = (currentIndex + 1) % readings.length;

    return {
      vehicleId: vehiclePlate,
      gps: reading.gps,
      speed: reading.speed,
      temperature: reading.temperature,
      lastUpdate: new Date().toISOString(),
    };
  },
};

import vehiclesData from "../data/vehicles.json";
import telemetryData from "../data/vehicleTelemetry.json";
import type {
  Vehicle,
  VehicleTelemetry,
  TelemetryReading,
} from "../types/vehicle";

const simulateApiDelay = (ms: number = 50) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Track current index per vehicle for cycling through data
const vehicleIndexMap: Record<string, number> = {};

export const vehicleApi = {
  getVehicles: async (): Promise<Vehicle[]> => {
    await simulateApiDelay(200);
    return vehiclesData as Vehicle[];
  },

  getVehicleTelemetry: async (
    vehicleId: string
  ): Promise<VehicleTelemetry | null> => {
    await simulateApiDelay();
    const data = telemetryData as Record<string, TelemetryReading[]>;
    const readings = data[vehicleId];

    if (!readings || readings.length === 0) return null;

    // Get current index and cycle through readings
    if (!(vehicleId in vehicleIndexMap)) {
      vehicleIndexMap[vehicleId] = 0;
    }

    const currentIndex = vehicleIndexMap[vehicleId];
    const reading = readings[currentIndex];

    // Move to next reading (loop back to start)
    vehicleIndexMap[vehicleId] = (currentIndex + 1) % readings.length;

    return {
      vehicleId,
      gps: reading.gps,
      speed: reading.speed,
      temperature: reading.temperature,
      lastUpdate: new Date().toISOString(),
    };
  },
};

import type {
  Vehicle,
  VehicleCreate,
  VehicleTelemetry,
  TelemetryReading,
} from "../types/vehicle";

const API_BASE_URL = "http://localhost:8000";
const WS_BASE_URL = "ws://localhost:8000";

// Cache for WebSocket connections per vehicle
const wsConnections: Record<string, WebSocket> = {};
const latestTelemetry: Record<string, VehicleTelemetry> = {};

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
   * Get telemetry for a vehicle via WebSocket
   * Connects to ws://localhost:8000/ws/telemetry/<vehiclePlate>
   */
  getVehicleTelemetry: async (
    vehiclePlate: string
  ): Promise<VehicleTelemetry | null> => {
    // Normalize plate by removing spaces for WebSocket URL
    const normalizedPlate = vehiclePlate.replace(/\s+/g, "");
    
    // Return cached data if available
    if (latestTelemetry[normalizedPlate]) {
      return latestTelemetry[normalizedPlate];
    }

    // If WebSocket already connected, wait for data
    if (wsConnections[normalizedPlate]) {
      // Wait a bit for data to arrive
      await new Promise((resolve) => setTimeout(resolve, 100));
      return latestTelemetry[normalizedPlate] || null;
    }

    // Create new WebSocket connection
    return new Promise((resolve) => {
      const ws = new WebSocket(`${WS_BASE_URL}/ws/telemetry/${normalizedPlate}/`);
      wsConnections[normalizedPlate] = ws;

      ws.onopen = () => {
        console.log(`WebSocket connected for vehicle: ${vehiclePlate}`);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Transform backend data to frontend format
          const telemetry: VehicleTelemetry = {
            vehicleId: vehiclePlate,
            gps: {
              lat: data.gps?.latitude || 41.0082,
              lng: data.gps?.longitude || 28.9784,
            },
            speed: data.speed_kmh || 0,
            temperature: data.cabin_temp_c || 0,
            lastUpdate: data.timestamp || new Date().toISOString(),
          };

          latestTelemetry[normalizedPlate] = telemetry;
          
          // Don't resolve again if already resolved (for subsequent messages)
          if (!latestTelemetry[normalizedPlate + '_resolved']) {
            latestTelemetry[normalizedPlate + '_resolved'] = telemetry;
            resolve(telemetry);
          }
        } catch (error) {
          console.error("Failed to parse telemetry data:", error);
        }
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${vehiclePlate}:`, error);
        delete wsConnections[normalizedPlate];
        resolve(null);
      };

      ws.onclose = () => {
        console.log(`WebSocket closed for vehicle: ${vehiclePlate}`);
        delete wsConnections[normalizedPlate];
      };

      // Timeout after 5 seconds if no data received
      setTimeout(() => {
        if (!latestTelemetry[normalizedPlate]) {
          resolve(null);
        }
      }, 5000);
    });
  },

  /**
   * Close WebSocket connection for a specific vehicle
   */
  closeVehicleTelemetry: (vehiclePlate: string) => {
    const normalizedPlate = vehiclePlate.replace(/\s+/g, "");
    if (wsConnections[normalizedPlate]) {
      wsConnections[normalizedPlate].close();
      delete wsConnections[normalizedPlate];
      delete latestTelemetry[normalizedPlate];
    }
  },

  /**
   * Close all WebSocket connections
   */
  closeAllTelemetry: () => {
    Object.keys(wsConnections).forEach((plate) => {
      wsConnections[plate].close();
    });
    Object.keys(wsConnections).forEach((key) => delete wsConnections[key]);
    Object.keys(latestTelemetry).forEach((key) => delete latestTelemetry[key]);
  },
};

import { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { VehiclePane } from "../../components/livemap/VehiclePane";
import { MapView } from "../../components/livemap/MapView";
import {
  TelemetryChartsPane,
  type TelemetryDataPoint,
} from "../../components/livemap/TelemetryChartsPane";
import { vehicleApi } from "../../services/vehicleApi";
import type { Vehicle, VehicleTelemetry } from "../../types/vehicle";

const POLLING_INTERVAL = 1000; // 1Hz - fetch every 1 second
const MAX_DATA_POINTS = 30; // Keep last 30 readings

// Design tokens
const COLORS = {
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
};

const LiveMap = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<VehicleTelemetry | null>(null);
  const [telemetryHistory, setTelemetryHistory] = useState<
    TelemetryDataPoint[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setError(null);
        const data = await vehicleApi.getVehicles();
        setVehicles(data);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setError(
          "Failed to load vehicles. Please check if the API server is running."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Fetch telemetry for selected vehicle and build history
  useEffect(() => {
    // Reset when vehicle changes
    setTelemetryHistory([]);
    setTelemetry(null);
    startTimeRef.current = null;

    if (!selectedPlate) return;

    const fetchTelemetry = async () => {
      const data = await vehicleApi.getVehicleTelemetry(selectedPlate);
      if (data) {
        setTelemetry(data);

        // Track time from first reading
        if (startTimeRef.current === null) {
          startTimeRef.current = Date.now();
        }

        // Add to history
        setTelemetryHistory((prev) => {
          const newPoint: TelemetryDataPoint = {
            speed: data.speed,
            temperature: data.temperature,
            time: Date.now() - (startTimeRef.current || Date.now()),
          };
          const updated = [...prev, newPoint];
          // Keep only last MAX_DATA_POINTS
          return updated.slice(-MAX_DATA_POINTS);
        });
      }
    };

    // Initial fetch
    fetchTelemetry();

    // Poll at 1Hz
    const intervalId = setInterval(fetchTelemetry, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [selectedPlate]);

  // Find selected vehicle for plate display
  const selectedVehicle = vehicles.find(
    (v) => v.vehicle_plate === selectedPlate
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: COLORS.textPrimary, mb: 0.5 }}
        >
          Live Map
        </Typography>
        <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
          Track vehicle locations in real-time
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Map Content */}
      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          height: "calc(100vh - 220px)",
          minHeight: 500,
        }}
      >
        <VehiclePane
          vehicles={vehicles}
          selectedPlate={selectedPlate}
          onSelect={setSelectedPlate}
        />
        {/* Map container with overlay charts */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <MapView
            telemetry={telemetry}
            vehiclePlate={selectedVehicle?.vehicle_plate}
          />
          {/* Telemetry Charts Overlay */}
          <TelemetryChartsPane
            data={telemetryHistory}
            vehiclePlate={selectedVehicle?.vehicle_plate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LiveMap;

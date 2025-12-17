import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { VehiclePane } from "../../components/livemap/VehiclePane";
import { MapView } from "../../components/livemap/MapView";
import { vehicleApi } from "../../services/vehicleApi";
import { useChatContext } from "../../utils/ChatContext";
import type { Vehicle, VehicleTelemetry } from "../../types/vehicle";

const POLLING_INTERVAL = 1000; // 1Hz - fetch every 1 second

// Design tokens
const COLORS = {
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
};

const LiveMap = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<VehicleTelemetry | null>(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedVehicle } = useChatContext();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await vehicleApi.getVehicles();
        setVehicles(response.vehicles);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setTelemetry(null);
      setSelectedVehicle(null); // Clear chat vehicle selection
      return;
    }

    // Update chat context with selected vehicle
    const vehicle = vehicles.find((v) => v.id === selectedId);
    setSelectedVehicle(selectedId, vehicle?.plate);

    const fetchTelemetry = async () => {
      const data = await vehicleApi.getVehicleTelemetry(selectedId);
      setTelemetry(data);
    };

    // Initial fetch
    fetchTelemetry();

    // Poll at 1Hz
    const intervalId = setInterval(fetchTelemetry, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [selectedId, vehicles, setSelectedVehicle]);

  const selectedVehicle = vehicles.find((v) => v.id === selectedId);

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
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <MapView telemetry={telemetry} vehiclePlate={selectedVehicle?.vehicle_plate} />
      </Box>
    </Box>
  );
};

export default LiveMap;

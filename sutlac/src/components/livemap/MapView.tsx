import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Box, Paper, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { VehicleTelemetry } from "../../types/vehicle";
import { useEffect } from "react";

// Fix Leaflet default marker icon issue with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  footerBg: "#fafafa",
  dataValue: "#3b82f6",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

const vehicleIcon = new L.Icon({
  iconUrl: "/images/car.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface MapViewProps {
  telemetry: VehicleTelemetry | null;
  vehiclePlate?: string;
}

const MapCenterUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 10);
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ telemetry, vehiclePlate }: MapViewProps) => {
  const defaultCenter: [number, number] = [39.0, 35.0];
  const center: [number, number] = telemetry
    ? [telemetry.gps.lat, telemetry.gps.lng]
    : defaultCenter;

  return (
    <Paper
      sx={{
        flex: 1,
        ...CARD_STYLES,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      elevation={0}
    >
      {/* Map Container */}
      <Box sx={{ flex: 1, position: "relative", minHeight: "500px", height: "100%" }}>
        <MapContainer
          center={center}
          zoom={telemetry ? 10 : 6}
          style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {telemetry && (
            <>
              <MapCenterUpdater
                lat={telemetry.gps.lat}
                lng={telemetry.gps.lng}
              />
              <Marker
                position={[telemetry.gps.lat, telemetry.gps.lng]}
                icon={vehicleIcon}
              >
                <Popup>
                  <strong>{vehiclePlate}</strong>
                  <br />
                  Speed: {telemetry.speed} km/h
                  <br />
                  Temp: {telemetry.temperature}°C
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </Box>

      {/* Telemetry Footer */}
      {telemetry && (
        <Box
          sx={{
            p: 2.5,
            borderTop: `1px solid ${COLORS.cardBorder}`,
            display: "flex",
            gap: 4,
            backgroundColor: COLORS.footerBg,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ color: COLORS.textSecondary, fontSize: "0.75rem" }}
            >
              Speed
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: COLORS.dataValue,
                fontSize: "1.1rem",
              }}
            >
              {telemetry.speed} km/h
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: COLORS.textSecondary, fontSize: "0.75rem" }}
            >
              Temperature
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: COLORS.dataValue,
                fontSize: "1.1rem",
              }}
            >
              {telemetry.temperature}°C
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: COLORS.textSecondary, fontSize: "0.75rem" }}
            >
              Location
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: COLORS.textPrimary }}
            >
              {telemetry.gps.lat.toFixed(4)}, {telemetry.gps.lng.toFixed(4)}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export { MapView };

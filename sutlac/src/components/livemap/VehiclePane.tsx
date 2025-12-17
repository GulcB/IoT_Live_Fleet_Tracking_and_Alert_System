import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import type { Vehicle, VehicleType } from "../../types/vehicle";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  selectedBg: "#eff6ff",
  typeCar: "#3b82f6",
  typeTruck: "#8b5cf6",
  typeBus: "#f97316",
  typeVan: "#22c55e",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface VehiclePaneProps {
  vehicles: Vehicle[];
  selectedPlate: string | null;
  onSelect: (plate: string) => void;
}

const getVehicleTypeColor = (type: VehicleType) => {
  switch (type) {
    case "CAR":
      return COLORS.typeCar;
    case "TRUCK":
      return COLORS.typeTruck;
    case "BUS":
      return COLORS.typeBus;
    case "VAN":
      return COLORS.typeVan;
    default:
      return COLORS.textSecondary;
  }
};

const VehiclePane = ({
  vehicles,
  selectedPlate,
  onSelect,
}: VehiclePaneProps) => {
  return (
    <Paper
      sx={{
        width: 280,
        height: "100%",
        ...CARD_STYLES,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
      elevation={0}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: "1rem" }}
        >
          Vehicles
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: COLORS.textSecondary, fontSize: "0.8rem", mt: 0.5 }}
        >
          {vehicles.length} total
        </Typography>
      </Box>

      {/* Vehicle List */}
      <List sx={{ flex: 1, overflow: "auto", p: 1 }}>
        {vehicles.map((vehicle) => (
          <ListItem key={vehicle.vehicle_plate} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedPlate === vehicle.vehicle_plate}
              onClick={() => onSelect(vehicle.vehicle_plate)}
              sx={{
                borderRadius: "12px",
                "&.Mui-selected": {
                  backgroundColor: COLORS.selectedBg,
                  "&:hover": { backgroundColor: COLORS.selectedBg },
                },
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <ListItemText
                primary={vehicle.vehicle_plate}
                secondary={`${vehicle.brand} ${vehicle.model} (${vehicle.year})`}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: COLORS.textPrimary,
                }}
                secondaryTypographyProps={{
                  fontSize: 12,
                  color: COLORS.textSecondary,
                }}
              />
              <Chip
                label={vehicle.vehicle_type}
                size="small"
                sx={{
                  backgroundColor: getVehicleTypeColor(vehicle.vehicle_type),
                  color: "white",
                  fontSize: 10,
                  height: 22,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export { VehiclePane };

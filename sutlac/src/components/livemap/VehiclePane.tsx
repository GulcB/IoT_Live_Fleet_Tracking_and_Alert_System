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
import type { Vehicle } from "../../types/vehicle";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  selectedBg: "#eff6ff",
  statusActive: "#22c55e",
  statusIdle: "#f97316",
  statusMaintenance: "#ef4444",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface VehiclePaneProps {
  vehicles: Vehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const getStatusColor = (status: Vehicle["status"]) => {
  switch (status) {
    case "moving":
      return COLORS.statusActive;
    case "idle":
      return COLORS.statusIdle;
    case "stopped":
    case "in_garage":
      return COLORS.statusMaintenance;
    default:
      return COLORS.textSecondary;
  }
};

const VehiclePane = ({ vehicles, selectedId, onSelect }: VehiclePaneProps) => {
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
          <ListItem key={vehicle.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedId === vehicle.id}
              onClick={() => onSelect(vehicle.id)}
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
                secondary={`${vehicle.model} • ${vehicle.driver_name || "No driver"}`}
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
                label={vehicle.status}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(vehicle.status),
                  color: "white",
                  fontSize: 10,
                  height: 22,
                  fontWeight: 500,
                  textTransform: "capitalize",
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

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { Vehicle } from "../../types/vehicle";
import StatusBadge from "../common/StatusBadge";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onRowClick?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicleId: string) => void;
}

const VehicleTable = ({ vehicles, onRowClick, onEdit, onDelete }: VehicleTableProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #e2e8f0",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f8fafc" }}>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Plate / ID
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Last Seen
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Speed
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Temp
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Active Alarms
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow
              key={vehicle.id}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  vehicle.active_alarms && vehicle.active_alarms > 0
                    ? "#fef2f2"
                    : "inherit",
                "&:hover": {
                  backgroundColor:
                    vehicle.active_alarms && vehicle.active_alarms > 0
                      ? "#fee2e2"
                      : "#f8fafc",
                },
              }}
              onClick={() => onRowClick?.(vehicle)}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      backgroundColor:
                        vehicle.active_alarms && vehicle.active_alarms > 0
                          ? "#fecaca"
                          : "#e0f2fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {vehicle.active_alarms && vehicle.active_alarms > 0 ? (
                      <WarningAmberIcon
                        sx={{ fontSize: 20, color: "#dc2626" }}
                      />
                    ) : (
                      <LocalShippingIcon
                        sx={{ fontSize: 20, color: "#0284c7" }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#1e293b" }}
                    >
                      {vehicle.vehicle_plate}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          vehicle.active_alarms && vehicle.active_alarms > 0
                            ? "#dc2626"
                            : "#64748b",
                      }}
                    >
                      {vehicle.active_alarms && vehicle.active_alarms > 0
                        ? vehicle.driver_name || "Alert"
                        : `${vehicle.brand} ${vehicle.model}`}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {vehicle.last_seen || "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                <StatusBadge status={vehicle.status} />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {vehicle.speed !== undefined ? `${vehicle.speed} km/h` : "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {vehicle.temperature !== undefined
                    ? `${vehicle.temperature}°C`
                    : "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                {vehicle.active_alarms && vehicle.active_alarms > 0 ? (
                  <Chip
                    label={vehicle.active_alarms}
                    size="small"
                    sx={{
                      backgroundColor: "#fecaca",
                      color: "#dc2626",
                      fontWeight: 600,
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    0
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    sx={{ color: "#64748b" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(vehicle);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#ef4444" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(vehicle.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;

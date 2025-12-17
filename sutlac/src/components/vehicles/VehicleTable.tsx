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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import type { Vehicle, VehicleType } from "../../types/vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onRowClick?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehiclePlate: string) => void;
}

const getVehicleIcon = (type: VehicleType) => {
  switch (type) {
    case "CAR":
      return <DirectionsCarIcon sx={{ fontSize: 20, color: "#3b82f6" }} />;
    case "TRUCK":
      return <LocalShippingIcon sx={{ fontSize: 20, color: "#8b5cf6" }} />;
    case "BUS":
      return <DirectionsBusIcon sx={{ fontSize: 20, color: "#f97316" }} />;
    case "VAN":
      return <AirportShuttleIcon sx={{ fontSize: 20, color: "#22c55e" }} />;
    default:
      return <LocalShippingIcon sx={{ fontSize: 20, color: "#64748b" }} />;
  }
};

const getTypeColor = (type: VehicleType) => {
  switch (type) {
    case "CAR":
      return { bg: "#eff6ff", color: "#3b82f6" };
    case "TRUCK":
      return { bg: "#f5f3ff", color: "#8b5cf6" };
    case "BUS":
      return { bg: "#fff7ed", color: "#f97316" };
    case "VAN":
      return { bg: "#f0fdf4", color: "#22c55e" };
    default:
      return { bg: "#f1f5f9", color: "#64748b" };
  }
};

const VehicleTable = ({
  vehicles,
  onRowClick,
  onEdit,
  onDelete,
}: VehicleTableProps) => {
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
              Plate
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Brand / Model
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Year
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Type
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => {
            const typeColors = getTypeColor(vehicle.vehicle_type);
            return (
              <TableRow
                key={vehicle.vehicle_plate}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
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
                        backgroundColor: typeColors.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getVehicleIcon(vehicle.vehicle_type)}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#1e293b" }}
                    >
                      {vehicle.vehicle_plate}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {vehicle.brand} {vehicle.model}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.year}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.vehicle_type}
                    size="small"
                    sx={{
                      backgroundColor: typeColors.bg,
                      color: typeColors.color,
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  />
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
                        onDelete?.(vehicle.vehicle_plate);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;

import { Box, Typography } from "@mui/material";
import type { VehicleStatus } from "../../types/vehicle";

interface StatusBadgeProps {
  status: VehicleStatus;
}

const STATUS_CONFIG: Record<
  VehicleStatus,
  { label: string; color: string; bgColor: string; dotColor: string }
> = {
  moving: {
    label: "Moving",
    color: "#059669",
    bgColor: "#ecfdf5",
    dotColor: "#10b981",
  },
  idle: {
    label: "Idle",
    color: "#6b7280",
    bgColor: "#f3f4f6",
    dotColor: "#9ca3af",
  },
  stopped: {
    label: "Stopped",
    color: "#dc2626",
    bgColor: "#fef2f2",
    dotColor: "#ef4444",
  },
  in_garage: {
    label: "In Garage",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    dotColor: "#8b5cf6",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.5,
        py: 0.5,
        borderRadius: "20px",
        backgroundColor: config.bgColor,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: config.dotColor,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.75rem",
          fontWeight: 500,
          color: config.color,
        }}
      >
        {config.label}
      </Typography>
    </Box>
  );
};

export default StatusBadge;

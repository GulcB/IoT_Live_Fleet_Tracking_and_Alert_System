import { Box, Typography, Paper } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SpeedIcon from "@mui/icons-material/Speed";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  primary: "#3b82f6",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f97316",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface Alert {
  id: string;
  type:
    | "overheating"
    | "speeding"
    | "low-pressure"
    | "signal-lost"
    | "route-completed";
  title: string;
  description: string;
  time: string;
}

interface LiveAlertsProps {
  alerts: Alert[];
  onViewAll?: () => void;
}

const alertConfig = {
  overheating: {
    icon: WarningAmberIcon,
    bgColor: "#fef2f2",
    iconColor: COLORS.error,
    dotColor: COLORS.error,
  },
  speeding: {
    icon: SpeedIcon,
    bgColor: "#fef2f2",
    iconColor: COLORS.error,
    dotColor: COLORS.warning,
  },
  "low-pressure": {
    icon: TireRepairIcon,
    bgColor: "#f0f9ff",
    iconColor: COLORS.primary,
    dotColor: undefined,
  },
  "signal-lost": {
    icon: SignalWifiOffIcon,
    bgColor: "#f8fafc",
    iconColor: COLORS.textSecondary,
    dotColor: undefined,
  },
  "route-completed": {
    icon: CheckCircleOutlineIcon,
    bgColor: "#f0fdf4",
    iconColor: COLORS.success,
    dotColor: undefined,
  },
};

const LiveAlerts = ({ alerts, onViewAll }: LiveAlertsProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        ...CARD_STYLES,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.5,
          pb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontSize: "1rem",
          }}
        >
          Live Alerts
        </Typography>
        <Typography
          component="button"
          onClick={onViewAll}
          sx={{
            color: COLORS.primary,
            fontSize: "0.8rem",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          View All
        </Typography>
      </Box>

      {/* Alerts List */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, pb: 2 }}>
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type];
          const IconComponent = config.icon;

          return (
            <Box
              key={alert.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                py: 1.5,
                px: 1.5,
                mb: index < alerts.length - 1 ? 1 : 0,
                borderRadius: "12px",
                backgroundColor: config.bgColor,
                transition: "all 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateX(4px)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconComponent sx={{ fontSize: 20, color: config.iconColor }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    fontSize: "0.85rem",
                    mb: 0.25,
                  }}
                >
                  {alert.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: COLORS.textSecondary,
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {alert.description}
                </Typography>
              </Box>

              {/* Time + Status Dot */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.textMuted,
                    fontSize: "0.7rem",
                  }}
                >
                  {alert.time}
                </Typography>
                {config.dotColor && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: config.dotColor,
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export { LiveAlerts };

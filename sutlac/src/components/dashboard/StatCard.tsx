import { Box, Typography, Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: "success" | "error" | "warning" | "info" | "default";
  icon: React.ReactNode;
  iconBgColor?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    label: string;
  };
}

const StatCard = ({
  title,
  value,
  subtitle,
  subtitleColor = "default",
  icon,
  iconBgColor = "#f1f5f9",
  trend,
}: StatCardProps) => {
  const getSubtitleColor = () => {
    switch (subtitleColor) {
      case "success":
        return COLORS.success;
      case "error":
        return COLORS.error;
      case "warning":
        return COLORS.warning;
      case "info":
        return COLORS.info;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        ...CARD_STYLES,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* Header: Title + Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            backgroundColor: iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: COLORS.textPrimary,
          fontSize: "1.75rem",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>

      {/* Subtitle or Trend */}
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: getSubtitleColor(),
            fontSize: "0.75rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {subtitleColor === "error" && "! "}
          {subtitle}
        </Typography>
      )}

      {trend && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {trend.direction === "up" ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: COLORS.success }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, color: COLORS.error }} />
          )}
          <Typography
            variant="body2"
            sx={{
              color: trend.direction === "up" ? COLORS.success : COLORS.error,
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            {trend.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textMuted,
              fontSize: "0.75rem",
            }}
          >
            {trend.label}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export { StatCard };

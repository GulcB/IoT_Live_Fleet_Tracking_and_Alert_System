import { Box, Paper, Typography } from "@mui/material";

// Design tokens
const COLORS = {
  cardBg: "rgba(255, 255, 255, 0.95)",
  cardBorder: "#e2e8f0",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  speedColor: "#3b82f6",
  tempColor: "#ef4444",
};

interface TelemetryDataPoint {
  speed: number;
  temperature: number;
  time: number;
}

interface TelemetryChartsPaneProps {
  data: TelemetryDataPoint[];
  vehiclePlate?: string;
}

// Simple bar/line visualization without external libraries
const SimpleChart = ({
  values,
  color,
  label,
  unit,
  currentValue,
}: {
  values: number[];
  color: string;
  label: string;
  unit: string;
  currentValue: number;
}) => {
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;

  return (
    <Box sx={{ flex: 1 }}>
      {/* Header with current value */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: COLORS.textSecondary, fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: color, fontSize: "0.9rem" }}
        >
          {currentValue}
          {unit}
        </Typography>
      </Box>

      {/* Simple bar chart */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "2px",
          height: 50,
          backgroundColor: "#f8fafc",
          borderRadius: 1,
          p: 0.5,
          overflow: "hidden",
        }}
      >
        {values.slice(-20).map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                minWidth: 3,
                height: `${Math.max(height, 5)}%`,
                backgroundColor: color,
                borderRadius: "2px 2px 0 0",
                opacity: 0.3 + (index / 20) * 0.7,
                transition: "height 0.3s ease",
              }}
            />
          );
        })}
      </Box>

      {/* Min/Max labels */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: COLORS.textSecondary, fontSize: "0.65rem" }}
        >
          Min: {minValue.toFixed(0)}
          {unit}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: COLORS.textSecondary, fontSize: "0.65rem" }}
        >
          Max: {maxValue.toFixed(0)}
          {unit}
        </Typography>
      </Box>
    </Box>
  );
};

const TelemetryChartsPane = ({
  data,
  vehiclePlate,
}: TelemetryChartsPaneProps) => {
  if (data.length === 0) return null;

  const speedValues = data.map((d) => d.speed);
  const tempValues = data.map((d) => d.temperature);
  const currentData = data[data.length - 1];

  return (
    <Paper
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 280,
        p: 2,
        backgroundColor: COLORS.cardBg,
        borderRadius: 2,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
      elevation={0}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: COLORS.textPrimary }}
        >
          Live Telemetry
        </Typography>
        {vehiclePlate && (
          <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
            {vehiclePlate}
          </Typography>
        )}
      </Box>

      {/* Charts */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SimpleChart
          values={speedValues}
          color={COLORS.speedColor}
          label="Speed"
          unit=" km/h"
          currentValue={currentData.speed}
        />
        <SimpleChart
          values={tempValues}
          color={COLORS.tempColor}
          label="Temperature"
          unit="°C"
          currentValue={currentData.temperature}
        />
      </Box>

      {/* Data points info */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1.5,
          color: COLORS.textSecondary,
          fontSize: "0.65rem",
        }}
      >
        {data.length} readings • Last {Math.min(data.length, 20)} shown
      </Typography>
    </Paper>
  );
};

export { TelemetryChartsPane };
export type { TelemetryDataPoint };

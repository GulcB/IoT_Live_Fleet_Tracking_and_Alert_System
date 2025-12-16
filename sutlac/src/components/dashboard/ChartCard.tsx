import {
  Box,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  chartGradientStart: "#3b82f6",
  chartGradientEnd: "#93c5fd",
  filterBg: "#f1f5f9",
  filterHover: "#f8fafc",
  filterActive: "#e2e8f0",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  children?: React.ReactNode;
  timeFilters?: boolean;
  defaultTimeFilter?: "15m" | "1h" | "24h";
  onTimeFilterChange?: (filter: string) => void;
}

const ChartCard = ({
  title,
  icon,
  iconBgColor = "#eff6ff",
  children,
  timeFilters = true,
  defaultTimeFilter = "15m",
  onTimeFilterChange,
}: ChartCardProps) => {
  const [activeFilter, setActiveFilter] = useState(defaultTimeFilter);

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter !== null) {
      setActiveFilter(newFilter as "15m" | "1h" | "24h");
      onTimeFilterChange?.(newFilter);
    }
  };

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: iconBgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Time Filters */}
        {timeFilters && (
          <ToggleButtonGroup
            value={activeFilter}
            exclusive
            onChange={handleFilterChange}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "8px !important",
                px: 1.5,
                py: 0.5,
                fontSize: "0.75rem",
                fontWeight: 500,
                color: COLORS.textSecondary,
                textTransform: "none",
                "&.Mui-selected": {
                  backgroundColor: COLORS.filterBg,
                  color: COLORS.textPrimary,
                  "&:hover": {
                    backgroundColor: COLORS.filterActive,
                  },
                },
                "&:hover": {
                  backgroundColor: COLORS.filterHover,
                },
              },
            }}
          >
            <ToggleButton value="15m" aria-label="15 minutes">
              15m
            </ToggleButton>
            <ToggleButton value="1h" aria-label="1 hour">
              1h
            </ToggleButton>
            <ToggleButton value="24h" aria-label="24 hours">
              24h
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {/* Chart Content */}
      <Box sx={{ flex: 1, p: 2.5, pt: 0, minHeight: 180 }}>
        {children || (
          // Placeholder chart visualization
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              gap: 0.5,
              pt: 2,
            }}
          >
            {/* Simple bar chart placeholder */}
            {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 90, 70, 55, 80].map(
              (height, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    height: `${height}%`,
                    background: `linear-gradient(180deg, ${COLORS.chartGradientStart} 0%, ${COLORS.chartGradientEnd} 100%)`,
                    borderRadius: "4px 4px 0 0",
                    opacity: 0.7 + index * 0.02,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "scaleY(1.05)",
                      transformOrigin: "bottom",
                    },
                  }}
                />
              )
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export { ChartCard };

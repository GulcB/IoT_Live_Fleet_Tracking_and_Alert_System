import { Box, CircularProgress, Grid } from "@mui/material";
import { StatCard } from "../../components/dashboard/StatCard";
import { LiveAlerts } from "../../components/dashboard/LiveAlerts";
import { ChartCard } from "../../components/dashboard/ChartCard";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { FleetScheduleTable } from "../../components/dashboard/FleetScheduleTable";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../services/dashboardApi";
import type { DashboardData } from "../../types/dashboard";

// Design tokens
const COLORS = {
  iconBlue: "#3b82f6",
  iconOrange: "#f97316",
  iconPurple: "#8b5cf6",
  iconGreen: "#22c55e",
  iconRed: "#ef4444",
  bgBlue: "#eff6ff",
  bgOrange: "#fff7ed",
  bgPurple: "#f5f3ff",
  bgGreen: "#f0fdf4",
  bgRed: "#fef2f2",
};

// Mock alerts data
const mockAlerts = [
  {
    id: "1",
    type: "overheating" as const,
    title: "Overheating",
    description: "Vehicle #104 - Engine Temp > 110°C",
    time: "2m ago",
  },
  {
    id: "2",
    type: "speeding" as const,
    title: "Speeding",
    description: "Vehicle #88 - 95km/h in 60 zone",
    time: "12m ago",
  },
  {
    id: "3",
    type: "low-pressure" as const,
    title: "Low Pressure",
    description: "Vehicle #22 - Rear Left Tire",
    time: "45m ago",
  },
  {
    id: "4",
    type: "signal-lost" as const,
    title: "Signal Lost",
    description: "Vehicle #09 - Last seen Sector 4",
    time: "1h ago",
  },
  {
    id: "5",
    type: "route-completed" as const,
    title: "Route Completed",
    description: "Vehicle #14 - Arrived at Depot",
    time: "2h ago",
  },
];

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardApi.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;
  const { weeklySchedule } = data;

  return (
    <Box>
      {/* Stat Cards Row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Online Vehicles"
            value="42/50"
            icon={
              <LocalShippingOutlinedIcon
                sx={{ fontSize: 22, color: COLORS.iconBlue }}
              />
            }
            iconBgColor={COLORS.bgBlue}
            trend={{ value: "+5%", direction: "up", label: "vs yesterday" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Alarms"
            value="3"
            subtitle="Action Required"
            subtitleColor="error"
            icon={
              <WarningAmberOutlinedIcon
                sx={{ fontSize: 22, color: COLORS.iconOrange }}
              />
            }
            iconBgColor={COLORS.bgOrange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Drivers On Duty"
            value="18"
            subtitle="Full Capacity"
            subtitleColor="default"
            icon={
              <PersonOutlinedIcon
                sx={{ fontSize: 22, color: COLORS.iconPurple }}
              />
            }
            iconBgColor={COLORS.bgPurple}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Avg Speed (15m)"
            value="64 km/h"
            icon={
              <SpeedOutlinedIcon
                sx={{ fontSize: 22, color: COLORS.iconGreen }}
              />
            }
            iconBgColor={COLORS.bgGreen}
            trend={{ value: "+2%", direction: "up", label: "vs yesterday" }}
          />
        </Grid>
      </Grid>

      {/* Schedule and Alerts Row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <FleetScheduleTable data={weeklySchedule} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <LiveAlerts
            alerts={mockAlerts}
            onViewAll={() => console.log("View all alerts")}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Avg Speed Trend"
            icon={
              <TrendingUpIcon sx={{ fontSize: 20, color: COLORS.iconBlue }} />
            }
            iconBgColor={COLORS.bgBlue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Cargo Temperature"
            icon={
              <ThermostatIcon sx={{ fontSize: 20, color: COLORS.iconRed }} />
            }
            iconBgColor={COLORS.bgRed}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

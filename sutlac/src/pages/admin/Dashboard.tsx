import { Box, Grid } from '@mui/material';
import { StatCard, LiveAlerts, ChartCard, LiveMap } from '../../components/dashboard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ThermostatIcon from '@mui/icons-material/Thermostat';

// Mock data - will be replaced with real API data
const mockAlerts = [
  {
    id: '1',
    type: 'overheating' as const,
    title: 'Overheating',
    description: 'Vehicle #104 - Engine Temp > 110°C',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'speeding' as const,
    title: 'Speeding',
    description: 'Vehicle #88 - 95km/h in 60 zone',
    time: '12m ago',
  },
  {
    id: '3',
    type: 'low-pressure' as const,
    title: 'Low Pressure',
    description: 'Vehicle #22 - Rear Left Tire',
    time: '45m ago',
  },
  {
    id: '4',
    type: 'signal-lost' as const,
    title: 'Signal Lost',
    description: 'Vehicle #09 - Last seen Sector 4',
    time: '1h ago',
  },
  {
    id: '5',
    type: 'route-completed' as const,
    title: 'Route Completed',
    description: 'Vehicle #14 - Arrived at Depot',
    time: '2h ago',
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Stat Cards Row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Online Vehicles"
            value="42/50"
            icon={<LocalShippingOutlinedIcon sx={{ fontSize: 22, color: '#3b82f6' }} />}
            iconBgColor="#eff6ff"
            trend={{ value: '+5%', direction: 'up', label: 'vs yesterday' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Alarms"
            value="3"
            subtitle="Action Required"
            subtitleColor="error"
            icon={<WarningAmberOutlinedIcon sx={{ fontSize: 22, color: '#f97316' }} />}
            iconBgColor="#fff7ed"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Drivers On Duty"
            value="18"
            subtitle="Full Capacity"
            subtitleColor="default"
            icon={<PersonOutlinedIcon sx={{ fontSize: 22, color: '#8b5cf6' }} />}
            iconBgColor="#f5f3ff"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Avg Speed (15m)"
            value="64 km/h"
            icon={<SpeedOutlinedIcon sx={{ fontSize: 22, color: '#22c55e' }} />}
            iconBgColor="#f0fdf4"
            trend={{ value: '+2%', direction: 'up', label: 'vs yesterday' }}
          />
        </Grid>
      </Grid>

      {/* Map and Alerts Row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <LiveMap />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <LiveAlerts 
            alerts={mockAlerts} 
            onViewAll={() => console.log('View all alerts')}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Avg Speed Trend"
            icon={<TrendingUpIcon sx={{ fontSize: 20, color: '#3b82f6' }} />}
            iconBgColor="#eff6ff"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Cargo Temperature"
            icon={<ThermostatIcon sx={{ fontSize: 20, color: '#ef4444' }} />}
            iconBgColor="#fef2f2"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

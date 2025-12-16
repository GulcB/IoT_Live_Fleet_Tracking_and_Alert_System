import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'success' | 'error' | 'warning' | 'info' | 'default';
  icon: React.ReactNode;
  iconBgColor?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
    label: string;
  };
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  subtitleColor = 'default',
  icon, 
  iconBgColor = '#f1f5f9',
  trend 
}: StatCardProps) => {
  const getSubtitleColor = () => {
    switch (subtitleColor) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#64748b';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {/* Header: Title + Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            backgroundColor: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          color: '#1e293b',
          fontSize: '1.75rem',
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
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {subtitleColor === 'error' && '! '}
          {subtitle}
        </Typography>
      )}

      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend.direction === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: '#22c55e' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
          )}
          <Typography
            variant="body2"
            sx={{
              color: trend.direction === 'up' ? '#22c55e' : '#ef4444',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {trend.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#94a3b8',
              fontSize: '0.75rem',
            }}
          >
            {trend.label}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;

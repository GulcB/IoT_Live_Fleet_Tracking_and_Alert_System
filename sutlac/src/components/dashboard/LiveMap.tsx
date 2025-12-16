import { Box, Typography, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface LiveMapProps {
  title?: string;
}

const LiveMap = ({ title = 'LIVE TRACKING' }: LiveMapProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Map Header Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '20px',
          px: 2,
          py: 0.75,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FiberManualRecordIcon sx={{ fontSize: 10, color: '#22c55e', animation: 'pulse 2s infinite' }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            color: '#1e293b',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Zoom Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 16,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}
      >
        <IconButton
          size="small"
          sx={{
            borderRadius: 0,
            p: 1,
            '&:hover': {
              backgroundColor: '#f1f5f9',
            },
          }}
          aria-label="Zoom in"
        >
          <AddIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ height: 1, backgroundColor: '#e2e8f0' }} />
        <IconButton
          size="small"
          sx={{
            borderRadius: 0,
            p: 1,
            '&:hover': {
              backgroundColor: '#f1f5f9',
            },
          }}
          aria-label="Zoom out"
        >
          <RemoveIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Map Placeholder - will be replaced with actual map */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#e8f0f8',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(rgba(200,200,200,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,200,200,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Simulated map markers */}
        <Box sx={{ position: 'absolute', top: '30%', left: '40%' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.5)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            🚛
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: '50%', left: '55%' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(34, 197, 94, 0.5)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            🚛
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: '65%', left: '35%' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            🚛
          </Box>
        </Box>
        
        {/* Map placeholder text */}
        <Typography
          sx={{
            color: '#94a3b8',
            fontSize: '0.9rem',
            fontWeight: 500,
            zIndex: 5,
          }}
        >
          Map will be integrated here
        </Typography>
      </Box>

      {/* Pulse animation for live indicator */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Paper>
  );
};

export default LiveMap;

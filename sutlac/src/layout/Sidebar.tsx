import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../utils/AuthContext';

// Sidebar constants
export const SIDEBAR_WIDTH = 240;
export const NAVBAR_HEIGHT = 80;

// Menu items configuration
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, path: '/', roles: ['admin', 'user'] },
  { id: 'live-map', label: 'Live Map', icon: MapOutlinedIcon, path: '/live-map', roles: ['admin', 'user'] },
  { id: 'fleet', label: 'Fleet', icon: LocalShippingOutlinedIcon, path: '/fleet', roles: ['admin'] },
  { id: 'drivers', label: 'Drivers', icon: PeopleOutlinedIcon, path: '/drivers', roles: ['admin'] },
  { id: 'settings', label: 'Settings', icon: SettingsOutlinedIcon, path: '/settings', roles: ['admin'] },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const drawerContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161e2b',
      }}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Logo + Brand Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2.5,
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #161e2b',
          }}
          aria-label="Company logo"
        >
          <Box
            component="span"
            sx={{
              width: 20,
              height: 12,
              borderBottom: '3px solid white',
              borderRadius: '0 0 50% 50%',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'white',
              },
            }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#8089986f', lineHeight: 1.2, fontSize: '0.95rem' }}>
            SUTLACCOMPANY
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.65rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            ADMIN PANEL
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: '12px',
                  py: 1.25,
                  px: 2,
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#5485d4b2' : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  '&:hover': {
                    backgroundColor: isActive ? '#5485d4b2' : '#3b82f614',
                    color: isActive ? 'white' : '#64748b',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#3b82f6',
                    '&:hover': { backgroundColor: '#2563eb' },
                  },
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <IconComponent sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Support Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box sx={{ backgroundColor: '#f8fafc', borderRadius: '16px', p: 2.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <SupportAgentOutlinedIcon sx={{ color: '#3b82f6', fontSize: 24 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>Support</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem', mb: 1.5 }}>
            Need help with the dashboard?
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Contact Admin
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: '12px',
            py: 1.25,
            borderColor: '#e2e8f0',
            color: '#64748b',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' },
          }}
          aria-label="Logout from dashboard"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box', border: 'none' } }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box', border: 'none', borderRight: '1px solid #f1f5f9' },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;

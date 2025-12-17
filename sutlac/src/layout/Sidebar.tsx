import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MapIcon from "@mui/icons-material/Map";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useAuth } from "../utils/AuthContext";

// Layout constants (exported for use in other layout components)
export const SIDEBAR_WIDTH = 240;
export const NAVBAR_HEIGHT = 72;

// Design tokens
const COLORS = {
  sidebar: "#161e2b",
  accent: "#0d9488",
  accentGradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  textDark: "#1e293b",
  cardBg: "#f8fafc",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
};

// Menu items configuration
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Vehicles", icon: <DirectionsCarIcon />, path: "/vehicles" },
  { text: "Live Map", icon: <MapIcon />, path: "/map" },
  { text: "Alerts", icon: <NotificationsIcon />, path: "/alerts" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const drawerContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.sidebar,
      }}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Logo + Brand Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2.5,
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: COLORS.accentGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 8px ${COLORS.sidebar}`,
          }}
          aria-label="Company logo"
        >
          <Box
            component="span"
            sx={{
              width: 20,
              height: 12,
              borderBottom: "3px solid white",
              borderRadius: "0 0 50% 50%",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "white",
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.2,
              fontSize: "0.95rem",
            }}
          >
            SUTLAC
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: COLORS.textLight,
              fontSize: "0.65rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Fleet Manager
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: "12px",
                  py: 1.25,
                  px: 2,
                  transition: "all 0.2s ease",
                  backgroundColor: isActive ? COLORS.primary : "transparent",
                  color: isActive ? "white" : COLORS.textMuted,
                  "&:hover": {
                    backgroundColor: isActive
                      ? COLORS.primaryHover
                      : "rgba(59, 130, 246, 0.08)",
                    color: isActive ? "white" : COLORS.textMuted,
                  },
                  "&.Mui-selected": {
                    backgroundColor: COLORS.primary,
                    "&:hover": { backgroundColor: COLORS.primaryHover },
                  },
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Support Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            backgroundColor: COLORS.cardBg,
            borderRadius: "16px",
            p: 2.5,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <SupportAgentOutlinedIcon
              sx={{ color: COLORS.primary, fontSize: 24 }}
            />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: COLORS.textDark }}
            >
              Support
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: COLORS.textMuted, fontSize: "0.8rem", mb: 1.5 }}
          >
            Need help with the dashboard?
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{
              color: COLORS.primary,
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
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
            borderRadius: "12px",
            py: 1.25,
            borderColor: COLORS.border,
            color: COLORS.textMuted,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: COLORS.cardBg,
            },
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
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            border: "none",
            overflowX: "hidden",
          },
        }}
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
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          border: "none",
          borderRight: `1px solid ${COLORS.borderLight}`,
          overflowX: "hidden",
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;

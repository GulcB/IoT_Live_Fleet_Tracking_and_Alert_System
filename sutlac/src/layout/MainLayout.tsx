import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar, { SIDEBAR_WIDTH, NAVBAR_HEIGHT } from "./Sidebar";

// Design constants
const CONTENT_MAX_WIDTH = 1400;
const CONTENT_PADDING = { xs: 16, sm: 24, md: 32 };

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Navbar onMenuClick={handleMenuClick} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${NAVBAR_HEIGHT}px`,
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
        role="main"
      >
        {/* Centered Content Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: CONTENT_MAX_WIDTH,
            p: {
              xs: `${CONTENT_PADDING.xs}px`,
              sm: `${CONTENT_PADDING.sm}px`,
              md: `${CONTENT_PADDING.md}px`,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

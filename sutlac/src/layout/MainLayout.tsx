import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { LAYOUT } from "../theme/tokens";

const { NAVBAR_HEIGHT, CONTENT_PADDING } = LAYOUT;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar onMenuClick={handleMenuClick} isMobile={isMobile} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${NAVBAR_HEIGHT}px`,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
        role="main"
      >
        {/* Content Container - fills available space naturally */}
        <Box
          sx={{
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

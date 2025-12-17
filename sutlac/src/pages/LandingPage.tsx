import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        p: 4,
      }}
    >
      {/* Logo/Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "#1e293b",
          mb: 2,
          textAlign: "center",
        }}
      >
        SUTLAC
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: "#64748b",
          mb: 1,
          textAlign: "center",
        }}
      >
        IoT Fleet Tracking & Alert System
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#94a3b8",
          mb: 6,
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        Real-time vehicle tracking, live telemetry monitoring, and intelligent
        alert management for your fleet.
      </Typography>

      {/* Try Demo Button */}
      <Button
        variant="contained"
        size="large"
        startIcon={<RocketLaunchIcon />}
        onClick={() => navigate("/login")}
        sx={{
          backgroundColor: "#3b82f6",
          px: 5,
          py: 1.5,
          fontSize: "1.1rem",
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        }}
      >
        Try Demo
      </Button>

      {/* Footer note */}
      <Typography
        variant="caption"
        sx={{
          color: "#94a3b8",
          mt: 4,
          textAlign: "center",
        }}
      >
        Demo version • Your friend will style this page later
      </Typography>
    </Box>
  );
};

export default LandingPage;

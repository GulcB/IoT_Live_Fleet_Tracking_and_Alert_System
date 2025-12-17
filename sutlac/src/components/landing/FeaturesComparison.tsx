import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Chip,
} from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import RouteIcon from "@mui/icons-material/Route";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ApiIcon from "@mui/icons-material/Api";
import TimelineIcon from "@mui/icons-material/Timeline";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    isPremium: boolean;
}

const FREE_FEATURES: Feature[] = [
    {
        icon: <GpsFixedIcon />,
        title: "Real-time GPS Tracking",
        description: "Track your entire fleet in real-time with live GPS coordinates",
        isPremium: false,
    },
    {
        icon: <TimelineIcon />,
        title: "Basic Telemetry",
        description: "Monitor speed, temperature, and essential vehicle metrics",
        isPremium: false,
    },
    {
        icon: <AssessmentIcon />,
        title: "Driving History & Reports",
        description: "Access comprehensive driving logs and basic analytics",
        isPremium: false,
    },
    {
        icon: <NotificationsActiveIcon />,
        title: "Simple Alerts",
        description: "Receive notifications for boundary violations and basic events",
        isPremium: false,
    },
];

const PREMIUM_FEATURES: Feature[] = [
    {
        icon: <BuildIcon />,
        title: "Predictive Maintenance",
        description: "AI-powered predictions to prevent breakdowns before they happen",
        isPremium: true,
    },
    {
        icon: <PersonIcon />,
        title: "Driver Behavior Analysis",
        description: "Detailed insights into driving patterns and safety scores",
        isPremium: true,
    },
    {
        icon: <RouteIcon />,
        title: "Route Optimization",
        description: "Smart routing algorithms to save time and fuel costs",
        isPremium: true,
    },
    {
        icon: <LocalGasStationIcon />,
        title: "Fuel Consumption Forecasting",
        description: "Predict and optimize fuel usage across your fleet",
        isPremium: true,
    },
    {
        icon: <ReceiptIcon />,
        title: "Integrated Invoice System",
        description: "Streamline billing with automated receipt and invoice management",
        isPremium: true,
    },
    {
        icon: <ApiIcon />,
        title: "API & ERP Integrations",
        description: "Seamless integration with your existing business systems",
        isPremium: true,
    },
];

const FeaturesComparison = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f8fafc" }}>
            <Container maxWidth="lg">
                {/* Section Header */}
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", md: "3rem" },
                            fontWeight: 700,
                            color: "#1e293b",
                            mb: 2,
                        }}
                    >
                        Complete Fleet Management Features
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#64748b",
                            maxWidth: 700,
                            mx: "auto",
                            fontWeight: 400,
                        }}
                    >
                        Essential capabilities for basic tracking, plus advanced tools for comprehensive fleet optimization
                    </Typography>
                </Box>

                {/* Free Features Section */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, color: "#1e293b" }}
                        >
                            Basic Features
                        </Typography>
                        <Chip
                            label="FREE FOREVER"
                            sx={{
                                backgroundColor: "#10b981",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {FREE_FEATURES.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: "100%",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: 2,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            backgroundColor: "#eff6ff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 2,
                                            color: "#3b82f6",
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem" }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Premium Features Section */}
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, color: "#1e293b" }}
                        >
                            Advanced Features
                        </Typography>
                        <Chip
                            label="UPGRADE"
                            sx={{
                                backgroundColor: "#0D47A1",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {PREMIUM_FEATURES.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: "100%",
                                        border: "2px solid #e0f2fe",
                                        borderRadius: 2,
                                        backgroundColor: "white",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            borderColor: "#0D47A1",
                                            boxShadow: "0 4px 20px rgba(13,71,161,0.15)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            background: "linear-gradient(135deg, #0D47A1 0%, #2196f3 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 2,
                                            color: "white",
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem" }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturesComparison;

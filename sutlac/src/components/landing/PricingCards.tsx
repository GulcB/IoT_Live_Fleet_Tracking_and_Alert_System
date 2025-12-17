import { Box, Container, Typography, Button, Paper, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PricingFeature {
    text: string;
    included: boolean;
}

const FREE_FEATURES: PricingFeature[] = [
    { text: "Real-time GPS Tracking", included: true },
    { text: "Basic Telemetry Monitoring", included: true },
    { text: "Driving History & Reports", included: true },
    { text: "Simple Boundary Alerts", included: true },
    { text: "Up to 5 Vehicles", included: true },
    { text: "Email Support", included: true },
];

const PREMIUM_FEATURES: PricingFeature[] = [
    { text: "Everything in Free", included: true },
    { text: "Unlimited Vehicles", included: true },
    { text: "Predictive Maintenance AI", included: true },
    { text: "Driver Behavior Analytics", included: true },
    { text: "Route Optimization", included: true },
    { text: "Fuel Consumption Forecasting", included: true },
    { text: "Invoice & Receipt System", included: true },
    { text: "API & ERP Integrations", included: true },
    { text: "Priority Support 24/7", included: true },
    { text: "Custom Integrations", included: true },
];

const PricingCards = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "white" }}>
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
                        Simple, Transparent Pricing
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#64748b",
                            maxWidth: 600,
                            mx: "auto",
                            fontWeight: 400,
                        }}
                    >
                        Start for free, upgrade when your fleet grows
                    </Typography>
                </Box>

                {/* Pricing Cards */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                        gap: 4,
                        maxWidth: 1000,
                        mx: "auto",
                    }}
                >
                    {/* Free Plan */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: "2px solid #e2e8f0",
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                borderColor: "#cbd5e1",
                                transform: "translateY(-8px)",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 600, mb: 1, color: "#1e293b" }}
                        >
                            Free Plan
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Perfect for small fleets getting started
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 700, color: "#1e293b", display: "inline" }}
                            >
                                $0
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: "#64748b", display: "inline", ml: 1 }}
                            >
                                /month
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => navigate("/login")}
                            sx={{
                                py: 1.5,
                                mb: 4,
                                borderColor: "#0D47A1",
                                color: "#0D47A1",
                                borderWidth: 2,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                "&:hover": {
                                    borderWidth: 2,
                                    borderColor: "#0D47A1",
                                    backgroundColor: "rgba(13, 71, 161, 0.04)",
                                },
                            }}
                        >
                            Get Started Free
                        </Button>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {FREE_FEATURES.map((feature, index) => (
                                <Box key={index} sx={{ display: "flex", gap: 1.5 }}>
                                    <CheckCircleIcon sx={{ color: "#10b981", fontSize: 20 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    {/* Premium Plan */}
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            border: "2px solid #0D47A1",
                            borderRadius: 3,
                            position: "relative",
                            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: "0 12px 40px rgba(13,71,161,0.2)",
                            },
                        }}
                    >
                        {/* Popular Badge */}
                        <Chip
                            label="MOST POPULAR"
                            sx={{
                                position: "absolute",
                                top: -12,
                                right: 24,
                                backgroundColor: "#10b981",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 600, mb: 1, color: "#1e293b" }}
                        >
                            Premium Plan
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Advanced features for growing enterprises
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ color: "#64748b", fontWeight: 500 }}
                            >
                                Contact for Pricing
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
                                Custom plans based on fleet size
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate("/login")}
                            sx={{
                                py: 1.5,
                                mb: 4,
                                backgroundColor: "#0D47A1",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                boxShadow: "0 4px 14px rgba(13,71,161,0.3)",
                                "&:hover": {
                                    backgroundColor: "#0a3a8a",
                                    boxShadow: "0 6px 20px rgba(13,71,161,0.4)",
                                },
                            }}
                        >
                            Contact Sales
                        </Button>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {PREMIUM_FEATURES.map((feature, index) => (
                                <Box key={index} sx={{ display: "flex", gap: 1.5 }}>
                                    <CheckCircleIcon sx={{ color: "#0D47A1", fontSize: 20 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#1e293b",
                                            fontWeight: index === 0 ? 600 : 400,
                                        }}
                                    >
                                        {feature.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default PricingCards;

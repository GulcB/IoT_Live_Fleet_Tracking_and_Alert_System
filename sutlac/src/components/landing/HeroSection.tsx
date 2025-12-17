import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import bgImage from "../../assets/bg.png";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, rgba(13, 71, 161, 0.85) 0%, rgba(25, 118, 210, 0.85) 50%, rgba(66, 165, 245, 0.85) 100%), url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: { xs: "80vh", md: "90vh" },
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                        py: { xs: 6, md: 10 },
                    }}
                >
                    {/* Main Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                            fontWeight: 800,
                            color: "white",
                            mb: 3,
                            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                            lineHeight: 1.2,
                        }}
                    >
                        Fleet Tracking
                        <br />
                        <Box component="span" sx={{ color: "#90caf9" }}>
                            Simplified
                        </Box>
                    </Typography>

                    {/* Subheadline */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                            color: "rgba(255,255,255,0.95)",
                            mb: 5,
                            maxWidth: 700,
                            mx: "auto",
                            fontWeight: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        Real-time GPS tracking, predictive maintenance, and driver analytics
                        — all in one powerful platform
                    </Typography>

                    {/* CTA Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<RocketLaunchIcon />}
                            onClick={() => navigate("/login")}
                            sx={{
                                backgroundColor: "white",
                                color: "#0D47A1",
                                px: 4,
                                py: 1.8,
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            Get Started Free
                        </Button>

                    </Box>

                    {/* Trust Badge */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "rgba(255,255,255,0.8)",
                            mt: 4,
                            fontSize: "0.95rem",
                        }}
                    >
                        ✓ No credit card required · ✓ Free forever plan available
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;

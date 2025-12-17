import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                backgroundColor: "#1e293b",
                color: "white",
                py: 6,
                mt: "auto",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            SUTLAC
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                            IoT Fleet Tracking & Alert System
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                            Real-time monitoring, predictive analytics, and smart fleet
                            management.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link
                                href="#features"
                                underline="hover"
                                sx={{ color: "#94a3b8", "&:hover": { color: "white" } }}
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                underline="hover"
                                sx={{ color: "#94a3b8", "&:hover": { color: "white" } }}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/login"
                                underline="hover"
                                sx={{ color: "#94a3b8", "&:hover": { color: "white" } }}
                            >
                                Login
                            </Link>
                            <Link
                                href="#contact"
                                underline="hover"
                                sx={{ color: "#94a3b8", "&:hover": { color: "white" } }}
                            >
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/* Social & Legal */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Connect
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                            <IconButton
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": { color: "white", backgroundColor: "#334155" },
                                }}
                            >
                                <GitHubIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": { color: "white", backgroundColor: "#334155" },
                                }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "#94a3b8",
                                    "&:hover": { color: "white", backgroundColor: "#334155" },
                                }}
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link
                                href="#privacy"
                                underline="hover"
                                sx={{ color: "#94a3b8", fontSize: "0.875rem", "&:hover": { color: "white" } }}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#terms"
                                underline="hover"
                                sx={{ color: "#94a3b8", fontSize: "0.875rem", "&:hover": { color: "white" } }}
                            >
                                Terms of Service
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    sx={{
                        borderTop: "1px solid #334155",
                        mt: 4,
                        pt: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                        © {currentYear} SUTLAC. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

import { Box } from "@mui/material";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesComparison";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;

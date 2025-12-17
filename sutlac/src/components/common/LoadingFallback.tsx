import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: 2,
      }}
      role="status"
      aria-label="Loading page content"
    >
      <CircularProgress size={40} thickness={4} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingFallback;

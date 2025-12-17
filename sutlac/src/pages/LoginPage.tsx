import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import LoginIcon from "@mui/icons-material/Login";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        p: 4,
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
        }}
        elevation={2}
      >
        {/* Header */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#1e293b", mb: 1, textAlign: "center" }}
        >
          Demo Login
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#64748b", mb: 3, textAlign: "center" }}
        >
          Access the fleet management dashboard
        </Typography>

        {/* Demo Credentials Info */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Demo Credentials:</strong>
            <br />
            Username: <code>admin</code>
            <br />
            Password: <code>admin</code>
          </Typography>
        </Alert>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            autoComplete="current-password"
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            sx={{
              py: 1.25,
              backgroundColor: "#3b82f6",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { backgroundColor: "#2563eb" },
            }}
          >
            Login to Dashboard
          </Button>
        </form>

        {/* Back link */}
        <Typography
          variant="body2"
          sx={{ color: "#64748b", mt: 3, textAlign: "center" }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", color: "#3b82f6" }}
          >
            ← Back to Landing Page
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;

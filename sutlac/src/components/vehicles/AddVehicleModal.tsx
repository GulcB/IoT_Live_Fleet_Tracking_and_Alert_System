import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { VehicleCreate, VehicleType } from "../../types/vehicle";
import { vehicleApi } from "../../services/vehicleApi";
import { useNotification } from "../../utils/NotificationContext";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: "CAR", label: "Car" },
  { value: "TRUCK", label: "Truck" },
  { value: "VAN", label: "Van" },
  { value: "BUS", label: "Bus" },
];

const INITIAL_FORM: VehicleCreate = {
  vehicle_plate: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  vehicle_type: "CAR",
};

const AddVehicleModal = ({ open, onClose, onSuccess }: AddVehicleModalProps) => {
  const [formData, setFormData] = useState<VehicleCreate>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showNotification } = useNotification();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.vehicle_plate.trim()) {
      newErrors.vehicle_plate = "Plate is required";
    }
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = "Invalid year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await vehicleApi.addVehicle(formData);
      showNotification("Vehicle added successfully!", "success");
      setFormData(INITIAL_FORM);
      onSuccess();
      onClose();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to add vehicle",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof VehicleCreate, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Add New Vehicle
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <TextField
            label="Vehicle Plate"
            value={formData.vehicle_plate}
            onChange={(e) => handleChange("vehicle_plate", e.target.value)}
            error={!!errors.vehicle_plate}
            helperText={errors.vehicle_plate}
            fullWidth
            placeholder="e.g., ABC-1234"
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Brand"
              value={formData.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              error={!!errors.brand}
              helperText={errors.brand}
              fullWidth
              placeholder="e.g., Toyota"
            />
            <TextField
              label="Model"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              error={!!errors.model}
              helperText={errors.model}
              fullWidth
              placeholder="e.g., Corolla"
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Year"
              type="number"
              value={formData.year}
              onChange={(e) => handleChange("year", parseInt(e.target.value))}
              error={!!errors.year}
              helperText={errors.year}
              fullWidth
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
            <FormControl fullWidth>
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={formData.vehicle_type}
                label="Vehicle Type"
                onChange={(e) =>
                  handleChange("vehicle_type", e.target.value as VehicleType)
                }
              >
                {VEHICLE_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#e2e8f0",
            color: "#64748b",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            textTransform: "none",
            backgroundColor: "#3b82f6",
            "&:hover": { backgroundColor: "#2563eb" },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Add Vehicle"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVehicleModal;

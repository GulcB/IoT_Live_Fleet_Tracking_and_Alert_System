import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { StatCard } from "../../components/dashboard/StatCard";
import VehicleFilters, {
  type FilterTab,
} from "../../components/vehicles/VehicleFilters";
import VehicleTable from "../../components/vehicles/VehicleTable";
import AddVehicleModal from "../../components/vehicles/AddVehicleModal";
import DeleteConfirmDialog from "../../components/vehicles/DeleteConfirmDialog";
import { vehicleApi } from "../../services/vehicleApi";
import { useNotification } from "../../utils/NotificationContext";
import type { Vehicle } from "../../types/vehicle";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showNotification } = useNotification();

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await vehicleApi.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      showNotification("Failed to fetch vehicles", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Filter vehicles based on active filter and search
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        vehicle.vehicle_plate.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Type filter
    if (activeFilter === "all") return true;
    return vehicle.vehicle_type === activeFilter;
  });

  // Calculate stats by vehicle type
  const stats = {
    total: vehicles.length,
    cars: vehicles.filter((v) => v.vehicle_type === "CAR").length,
    trucks: vehicles.filter((v) => v.vehicle_type === "TRUCK").length,
    buses: vehicles.filter((v) => v.vehicle_type === "BUS").length,
    vans: vehicles.filter((v) => v.vehicle_type === "VAN").length,
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setModalOpen(true);
  };

  const handleDelete = (vehiclePlate: string) => {
    const vehicle = vehicles.find((v) => v.vehicle_plate === vehiclePlate);
    if (vehicle) {
      setVehicleToDelete(vehicle);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;

    setDeleteLoading(true);
    try {
      await vehicleApi.deleteVehicle(vehicleToDelete.id!);
      showNotification(
        `Vehicle ${vehicleToDelete.vehicle_plate} deleted successfully!`,
        "success"
      );
      setDeleteDialogOpen(false);
      setVehicleToDelete(null);
      fetchVehicles();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete vehicle",
        "error"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            Vehicle List
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#f1f5f9",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              color: "#64748b",
            }}
          >
            {vehicles.length} Total
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <StatCard
          title="Total Fleet"
          value={stats.total}
          icon={<LocalShippingIcon sx={{ color: "#3b82f6" }} />}
          iconBgColor="#eff6ff"
        />
        <StatCard
          title="Cars"
          value={stats.cars}
          icon={<DirectionsCarIcon sx={{ color: "#3b82f6" }} />}
          iconBgColor="#eff6ff"
        />
        <StatCard
          title="Trucks"
          value={stats.trucks}
          icon={<LocalShippingIcon sx={{ color: "#8b5cf6" }} />}
          iconBgColor="#f5f3ff"
        />
        <StatCard
          title="Buses & Vans"
          value={stats.buses + stats.vans}
          icon={<DirectionsBusIcon sx={{ color: "#f97316" }} />}
          iconBgColor="#fff7ed"
        />
      </Box>

      {/* Search Bar and Add Vehicle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f8fafc",
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            px: 2,
            py: 0.75,
            flex: 1,
            maxWidth: 400,
          }}
        >
          <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
          <InputBase
            placeholder="Search by Plate, Brand, or Model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              fontSize: "0.875rem",
              "& ::placeholder": { color: "#94a3b8" },
            }}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            textTransform: "none",
            backgroundColor: "#3b82f6",
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontWeight: 500,
            "&:hover": { backgroundColor: "#2563eb" },
            whiteSpace: "nowrap",
          }}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* Filters */}
      <VehicleFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Table */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>Loading...</Box>
      ) : (
        <VehicleTable
          vehicles={filteredVehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add/Edit Vehicle Modal */}
      <AddVehicleModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditVehicle(null);
        }}
        onSuccess={fetchVehicles}
        vehicle={editVehicle}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        vehiclePlate={vehicleToDelete?.vehicle_plate || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default Vehicles;

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  InputBase,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SpeedIcon from "@mui/icons-material/Speed";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { StatCard } from "../../components/dashboard/StatCard";
import VehicleFilters, {
  type FilterTab,
} from "../../components/vehicles/VehicleFilters";
import VehicleTable from "../../components/vehicles/VehicleTable";
import AddVehicleModal from "../../components/vehicles/AddVehicleModal";
import { vehicleApi } from "../../services/vehicleApi";
import type { Vehicle } from "../../types/vehicle";

const PAGE_SIZE = 5;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await vehicleApi.getVehicles(page, PAGE_SIZE);
      setVehicles(response.vehicles);
      setTotalVehicles(response.total);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

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

    // Status filter
    if (activeFilter === "all") return true;
    if (activeFilter === "with_alarms")
      return vehicle.active_alarms && vehicle.active_alarms > 0;
    return vehicle.status === activeFilter;
  });

  // Calculate stats
  const stats = {
    total: totalVehicles,
    active: vehicles.filter((v) => v.status === "moving").length,
    idle: vehicles.filter((v) => v.status === "idle").length,
    alarms: vehicles.reduce((acc, v) => acc + (v.active_alarms || 0), 0),
  };

  const totalPages = Math.ceil(totalVehicles / PAGE_SIZE);

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
            {totalVehicles} Total
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              px: 2,
              py: 0.75,
              minWidth: { xs: 200, md: 280 },
            }}
          >
            <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
            <InputBase
              placeholder="Search by Plate, ID, or Driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                fontSize: "0.875rem",
                "& ::placeholder": { color: "#94a3b8" },
              }}
            />
          </Box>

          {/* Notification bell placeholder */}
          <IconButton sx={{ color: "#64748b" }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#fbbf24",
                position: "absolute",
                top: 8,
                right: 8,
              }}
            />
            🔔
          </IconButton>

          {/* Add Vehicle Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
            sx={{
              textTransform: "none",
              backgroundColor: "#ef4444",
              borderRadius: 2,
              px: 2.5,
              py: 1,
              fontWeight: 500,
              "&:hover": { backgroundColor: "#dc2626" },
            }}
          >
            Add Vehicle
          </Button>
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
          trend={{ value: "+2%", direction: "up", label: "vs last month" }}
        />
        <StatCard
          title="Active Now"
          value={stats.active}
          icon={<SpeedIcon sx={{ color: "#10b981" }} />}
          iconBgColor="#ecfdf5"
          trend={{ value: "+12%", direction: "up", label: "current usage" }}
        />
        <StatCard
          title="Idle Vehicles"
          value={stats.idle}
          icon={<PauseCircleOutlineIcon sx={{ color: "#64748b" }} />}
          iconBgColor="#f1f5f9"
          trend={{ value: "-5%", direction: "down", label: "efficiency drop" }}
        />
        <StatCard
          title="Active Alarms"
          value={stats.alarms}
          subtitle="Attention needed"
          subtitleColor="error"
          icon={<WarningAmberIcon sx={{ color: "#f59e0b" }} />}
          iconBgColor="#fffbeb"
        />
      </Box>

      {/* Filters */}
      <VehicleFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        alarmCount={stats.alarms}
      />

      {/* Table */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>Loading...</Box>
      ) : (
        <VehicleTable vehicles={filteredVehicles} />
      )}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, totalVehicles)}-
          {Math.min(page * PAGE_SIZE, totalVehicles)} of {totalVehicles}
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "#3b82f6",
                color: "white",
              },
            },
          }}
        />
      </Box>

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchVehicles}
      />
    </Box>
  );
};

export default Vehicles;

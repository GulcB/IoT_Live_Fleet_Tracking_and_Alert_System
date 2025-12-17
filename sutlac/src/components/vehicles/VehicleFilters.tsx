import { Box, Tabs, Tab } from "@mui/material";
import type { VehicleType } from "../../types/vehicle";

type FilterTab = "all" | VehicleType;

interface VehicleFiltersProps {
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
}

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All Vehicles" },
  { value: "CAR", label: "Cars" },
  { value: "TRUCK", label: "Trucks" },
  { value: "BUS", label: "Buses" },
  { value: "VAN", label: "Vans" },
];

const VehicleFilters = ({
  activeFilter,
  onFilterChange,
}: VehicleFiltersProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        py: 1,
      }}
    >
      <Tabs
        value={activeFilter}
        onChange={(_, value) => onFilterChange(value)}
        sx={{
          minHeight: 40,
          "& .MuiTabs-indicator": {
            backgroundColor: "#3b82f6",
            height: 2,
          },
          "& .MuiTab-root": {
            minHeight: 40,
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#64748b",
            "&.Mui-selected": {
              color: "#1e293b",
            },
          },
        }}
      >
        {FILTER_TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default VehicleFilters;
export type { FilterTab };

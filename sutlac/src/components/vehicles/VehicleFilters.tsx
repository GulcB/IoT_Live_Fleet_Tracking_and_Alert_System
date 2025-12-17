import { Box, Tabs, Tab, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import type { VehicleStatus } from "../../types/vehicle";

type FilterTab = "all" | VehicleStatus | "with_alarms";

interface VehicleFiltersProps {
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
  alarmCount?: number;
}

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All Vehicles" },
  { value: "moving", label: "Moving" },
  { value: "idle", label: "Idle" },
  { value: "in_garage", label: "In Garage" },
  { value: "with_alarms", label: "With Alarms" },
];

const VehicleFilters = ({
  activeFilter,
  onFilterChange,
  alarmCount = 0,
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
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              tab.value === "with_alarms" ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                    }}
                  />
                  {tab.label}
                  {alarmCount > 0 && ` (${alarmCount})`}
                </Box>
              ) : (
                tab.label
              )
            }
          />
        ))}
      </Tabs>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            borderColor: "#e2e8f0",
            color: "#64748b",
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          sx={{
            textTransform: "none",
            borderColor: "#e2e8f0",
            color: "#64748b",
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
};

export default VehicleFilters;
export type { FilterTab };

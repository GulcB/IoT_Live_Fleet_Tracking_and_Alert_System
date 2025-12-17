import { Paper, Box, Typography } from "@mui/material";
import type { WeeklyScheduleItem } from "../../types/dashboard";

interface FleetScheduleTableProps {
  data: WeeklyScheduleItem[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 5);

const FleetScheduleTable = ({ data }: FleetScheduleTableProps) => {
  const getScheduleStartingAt = (day: number, hour: number) => {
    return data.filter(
      (item) => item.dayOfWeek === day && item.startHour === hour
    );
  };

  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
      elevation={0}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={600}>
          Weekly Fleet Schedule
        </Typography>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "60px repeat(7, 1fr)",
            minWidth: 700,
          }}
        >
          <Box
            sx={{
              p: 1,
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
          {DAYS.map((day) => (
            <Box
              key={day}
              sx={{
                p: 1,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {day}
              </Typography>
            </Box>
          ))}

          {HOURS.map((hour) => (
            <Box key={hour} sx={{ display: "contents" }}>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {`${hour}:00`}
                </Typography>
              </Box>
              {DAYS.map((_, dayIndex) => {
                const schedules = getScheduleStartingAt(dayIndex, hour);
                return (
                  <Box
                    key={dayIndex}
                    sx={{
                      minHeight: 40,
                      borderBottom: "1px solid",
                      borderLeft: "1px solid",
                      borderColor: "divider",
                      p: 0.5,
                    }}
                  >
                    {schedules.map((schedule) => (
                      <Box
                        key={schedule.id}
                        sx={{
                          backgroundColor: "#1a237e",
                          color: "#fff",
                          borderRadius: 1,
                          px: 0.75,
                          py: 0.25,
                          mb: 0.25,
                          fontSize: 10,
                          lineHeight: 1.3,
                        }}
                      >
                        <Box sx={{ fontWeight: 600 }}>
                          {schedule.vehiclePlate}
                        </Box>
                        <Box sx={{ opacity: 0.9 }}>
                          {schedule.startHour}:00 - {schedule.route}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export { FleetScheduleTable };

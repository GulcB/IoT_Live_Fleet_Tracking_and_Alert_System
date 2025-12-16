import { Paper, Box, Typography } from "@mui/material";
import type { WeeklyScheduleItem } from "../../types/dashboard";

// Design tokens (consistent across all components)
const COLORS = {
  cardBg: "#ffffff",
  cardBorder: "#f1f5f9",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  headerBg: "#f5f5f5",
  hourBg: "#fafafa",
  scheduleBg: "#3b82f6",
  scheduleText: "#ffffff",
};

const CARD_STYLES = {
  borderRadius: "16px",
  border: `1px solid ${COLORS.cardBorder}`,
  backgroundColor: COLORS.cardBg,
};

interface FleetScheduleTableProps {
  data: WeeklyScheduleItem[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 5);

const FleetScheduleTable = ({ data }: FleetScheduleTableProps) => {
  const getScheduleForCell = (day: number, hour: number) => {
    return data.filter(
      (item) =>
        item.dayOfWeek === day && hour >= item.startHour && hour < item.endHour
    );
  };

  return (
    <Paper sx={{ ...CARD_STYLES, overflow: "hidden" }} elevation={0}>
      {/* Header */}
      <Box sx={{ p: 2.5, borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: "1rem" }}
        >
          Weekly Fleet Schedule
        </Typography>
      </Box>

      {/* Table Content */}
      <Box sx={{ overflowX: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "60px repeat(7, 1fr)",
            minWidth: 700,
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              p: 1,
              backgroundColor: COLORS.headerBg,
              borderBottom: `1px solid ${COLORS.cardBorder}`,
            }}
          />
          {DAYS.map((day) => (
            <Box
              key={day}
              sx={{
                p: 1,
                backgroundColor: COLORS.headerBg,
                borderBottom: `1px solid ${COLORS.cardBorder}`,
                borderLeft: `1px solid ${COLORS.cardBorder}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: COLORS.textPrimary }}
              >
                {day}
              </Typography>
            </Box>
          ))}

          {/* Hour Rows */}
          {HOURS.map((hour) => (
            <Box key={hour} sx={{ display: "contents" }}>
              {/* Hour Label */}
              <Box
                sx={{
                  p: 1,
                  backgroundColor: COLORS.hourBg,
                  borderBottom: `1px solid ${COLORS.cardBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.textSecondary }}
                >
                  {`${hour}:00`}
                </Typography>
              </Box>

              {/* Day Cells */}
              {DAYS.map((_, dayIndex) => {
                const schedules = getScheduleForCell(dayIndex, hour);
                return (
                  <Box
                    key={dayIndex}
                    sx={{
                      minHeight: 40,
                      borderBottom: `1px solid ${COLORS.cardBorder}`,
                      borderLeft: `1px solid ${COLORS.cardBorder}`,
                      p: 0.5,
                    }}
                  >
                    {schedules.map((schedule) => (
                      <Box
                        key={schedule.id}
                        sx={{
                          backgroundColor: COLORS.scheduleBg,
                          color: COLORS.scheduleText,
                          borderRadius: "6px",
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

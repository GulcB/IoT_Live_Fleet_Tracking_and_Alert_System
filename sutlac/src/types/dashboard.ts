export interface DashboardStats {
  vehicles: { running: number; total: number };
  drivers: { active: number; total: number };
  alerts: { active: number; total: number };
  averageSpeed: number;
  totalTraveledTime: string;
  totalTraveledDistance: string;
}

export interface WeeklyScheduleItem {
  id: string;
  vehiclePlate: string;
  driverName: string;
  route: string;
  dayOfWeek: number; // 0 = Monday, 6 = Sunday
  startHour: number;
  endHour: number;
  status: "scheduled" | "in_transit" | "completed" | "delayed";
}

export interface DashboardData {
  stats: DashboardStats;
  weeklySchedule: WeeklyScheduleItem[];
}

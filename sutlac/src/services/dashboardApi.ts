import dashboardData from "../data/dashboardData.json";
import type { DashboardData } from "../types/dashboard";

const simulateApiDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    await simulateApiDelay();
    return dashboardData as DashboardData;
  },
};

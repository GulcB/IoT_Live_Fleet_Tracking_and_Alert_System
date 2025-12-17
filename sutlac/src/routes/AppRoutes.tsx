import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../utils/AuthContext";
import LoadingFallback from "../components/common/LoadingFallback";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Vehicles = lazy(() => import("../pages/admin/Vehicles"));
const LiveMap = lazy(() => import("../pages/admin/LiveMap"));
const Alerts = lazy(() => import("../pages/admin/Alerts"));
const Settings = lazy(() => import("../pages/admin/Settings"));

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

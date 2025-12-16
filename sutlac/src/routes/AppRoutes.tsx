import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import MainLayout from '../layout/MainLayout';
import { useAuth } from '../utils/AuthContext';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		// TODO: Replace with Keycloak redirect
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

const AppRoutes = () => {
	return (
		<Routes>
			{/* TODO: Auth routes will be handled by Keycloak */}

			<Route
				path="/"
				element={
					<RequireAuth>
						<MainLayout />
					</RequireAuth>
				}
			>
				<Route index element={<Dashboard />} />
				{/* Add more private routes here */}
			</Route>
		</Routes>
	);
};

export default AppRoutes;

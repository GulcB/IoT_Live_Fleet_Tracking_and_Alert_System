import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar, { SIDEBAR_WIDTH, NAVBAR_HEIGHT } from './Sidebar';

const MainLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 768px

	const handleMenuClick = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleSidebarClose = () => {
		setSidebarOpen(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				minHeight: '100vh',
				width: '100%',
			}}
		>
			{/* Navbar - fixed at top */}
			<Navbar onMenuClick={handleMenuClick} />

			{/* Sidebar - permanent on desktop, drawer on mobile */}
			<Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

			{/* Main Content Area */}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					pt: `${NAVBAR_HEIGHT}px`,
					ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
					minHeight: '100vh',
					backgroundColor: 'background.default',
					transition: theme.transitions.create(['margin'], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
				}}
				role="main"
				aria-label="Main content"
			>
				<Box sx={{ p: { xs: 2, sm: 3 } }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;

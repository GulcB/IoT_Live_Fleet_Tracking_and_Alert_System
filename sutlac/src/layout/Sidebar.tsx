import { Drawer, Box, useTheme, useMediaQuery } from '@mui/material';

// Sidebar width constants - exported for use in MainLayout
export const SIDEBAR_WIDTH = 240;
export const NAVBAR_HEIGHT = 64;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 768px

    const drawerContent = (
        <Box
            sx={{
                width: SIDEBAR_WIDTH,
                height: '100%',
                backgroundColor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                pt: `${NAVBAR_HEIGHT}px`, // Space for navbar
            }}
            role="navigation"
            aria-label="Sidebar navigation"
        >
            {/* Placeholder: Menu items will go here */}
            <Box sx={{ p: 2 }}>
                {/* Sidebar content placeholder */}
            </Box>
        </Box>
    );

    // Mobile: Temporary drawer (overlay)
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: SIDEBAR_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    // Desktop: Permanent drawer
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: SIDEBAR_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: SIDEBAR_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
            open
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;

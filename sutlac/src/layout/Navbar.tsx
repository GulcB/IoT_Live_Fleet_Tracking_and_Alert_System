import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                height: 64,
            }}
            role="banner"
            aria-label="Main navigation bar"
        >
            <Toolbar sx={{ minHeight: 64 }}>
                {/* Hamburger menu for mobile */}
                <IconButton
                    color="inherit"
                    aria-label="Open sidebar menu"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{
                        mr: 2,
                        display: { md: 'none' } // Hidden on desktop (768px+)
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Placeholder: Logo/Brand will go here */}
                <Box sx={{ flexGrow: 1 }}>
                    {/* Logo placeholder */}
                </Box>

                {/* Placeholder: User menu, notifications, etc. will go here */}
                <Box>
                    {/* Right side items placeholder */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

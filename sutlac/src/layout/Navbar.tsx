import { AppBar, Toolbar, IconButton, Box, Typography, InputBase, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { SIDEBAR_WIDTH } from './Sidebar';

interface NavbarProps {
  onMenuClick: () => void;
  pageTitle?: string;
}

const Navbar = ({ onMenuClick, pageTitle = 'Fleet Overview' }: NavbarProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 72,
        borderRadius: '0 0 20px 0',
        backgroundColor: '#161e2b',
        // Offset by sidebar width on desktop
        ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH - 1}px)` },
        boxShadow: '0 4px 24px #00000026',
      }}
      role="banner"
      aria-label="Main navigation bar"
    >
      <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 }, gap: 2 }}>
        {/* Mobile hamburger */}
        <IconButton
          color="inherit"
          aria-label="Open sidebar menu"
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: 'none' }, color: 'white' }}
        >
          <MenuIcon />
        </IconButton>

        
        {/* Mobile Logo - only on mobile since sidebar is hidden */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 10,
                borderBottom: '2px solid white',
                borderRadius: '0 0 50% 50%',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                },
              }}
            />
          </Box>
        </Box>

        {/* Page Title + Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            {pageTitle}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', display: { xs: 'none', sm: 'block' } }}>
            {currentDate}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Search + Icons + Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          {/* Search */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '12px',
              px: 2,
              py: 0.75,
              minWidth: { sm: 160, md: 200 },
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
              '&:focus-within': { backgroundColor: 'rgba(255,255,255,0.15)', boxShadow: '0 0 0 2px rgba(13,148,136,0.3)' },
            }}
          >
            <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search fleet..."
              sx={{ color: 'white', fontSize: '0.875rem', '& ::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 } }}
              inputProps={{ 'aria-label': 'search fleet' }}
            />
          </Box>

          {/* Notifications */}
          <IconButton
            color="inherit"
            aria-label="Notifications"
            sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            <Badge variant="dot" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ef4444' } }}>
              <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          {/* Messages */}
          <IconButton
            color="inherit"
            aria-label="Messages"
            sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* Avatar */}
          <Avatar
            alt="User"
            sx={{
              width: 36,
              height: 36,
              ml: 0.5,
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'border-color 0.2s ease',
              '&:hover': { borderColor: 'rgba(255,255,255,0.5)' },
            }}
            aria-label="User profile"
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

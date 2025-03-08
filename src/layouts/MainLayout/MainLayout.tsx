import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer, 
  Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationMenu from '@components/NavigationMenu';
import AuthMenu from '@components/AuthMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login clicked');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'red' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EDM
          </Typography>
          <AuthMenu onLogin={handleLogin} onLogout={handleLogout} />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <NavigationMenu onClose={() => toggleDrawer(false)} />
      </Drawer>

      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

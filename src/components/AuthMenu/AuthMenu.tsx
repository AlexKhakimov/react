import React, { useState } from 'react';
import { 
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface AuthMenuProps {
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthMenu: React.FC<AuthMenuProps> = ({ onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAuthMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    handleAuthMenuClose();
    onLogin();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    handleAuthMenuClose();
    onLogout();
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleAuthMenuClick}
        startIcon={<AccountCircleIcon />}
        sx={{ textTransform: 'none' }}
      >
        {isAuthenticated ? 'User Name' : 'Авторизация'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAuthMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {isAuthenticated ? (
          [
            <MenuItem key="profile" onClick={handleAuthMenuClose}>Профиль</MenuItem>,
            <MenuItem key="settings" onClick={handleAuthMenuClose}>Настройки</MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>Выйти</MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleLogin}>Войти</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default AuthMenu;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

interface NavigationMenuProps {
  onClose: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Главная', path: '/' },
    { text: 'Синхронизация', path: '/sync' },
    { text: 'Загрузка', path: '/upload' }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <List sx={{ width: 250 }}>
      {menuItems.map((item) => (
        <ListItem button key={item.text} onClick={() => handleMenuClick(item.path)}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationMenu;

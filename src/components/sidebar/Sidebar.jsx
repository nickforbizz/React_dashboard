import {
  Brightness4,
  Brightness7,
  Dashboard,
  Home,
  Logout,
  Notifications,
  People,
  Person,
  Settings,
} from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './sidebar.css';
import { ColorModeContext } from '../../context/ColorModeContext';

function Sidebar() {
  const theme = useTheme();
  const colorMode  = React.useContext(ColorModeContext);
 
  return (
    <Container className="sidebar">
      <Link to="/admin/" className="sidebar-item">
        {/* <> */}
        <Dashboard className="icon" />
        <Typography className="sidebar-text"> Dashboard</Typography>
        {/* </Link> */}
      </Link>

      <Link to="/admin/users" className="sidebar-item">
        <People className="icon" />
        <Typography className="sidebar-text"> Users</Typography>
      </Link>

      <Link to="/admin/notifications" className="sidebar-item">
        <Notifications className="icon" />
        <Typography className="sidebar-text"> Notifications</Typography>
      </Link>

      <Link to="/admin/settings" className="sidebar-item">
        <Settings className="icon" />
        <Typography className="sidebar-text"> Settings</Typography>
      </Link>

      <Link to="/admin/profile" className="sidebar-item">
        <Person className="icon" />
        <Typography className="sidebar-text"> Profile</Typography>
      </Link>

      <Link to="/admin/" className="sidebar-item">
        <Logout className="icon" />
        <Typography className="sidebar-text"> Logout</Typography>
      </Link>

      {theme.palette.mode.toUpperCase()} Mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Container>
  );
}

export default Sidebar;

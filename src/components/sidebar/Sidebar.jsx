import {
  Brightness4,
  Brightness7,
  Dashboard,
  ExpandMore,
  Forum,
  Home,
  InsertChart,
  Logout,
  Notifications,
  People,
  Person,
  Report,
  Settings,
} from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, Typography } from '@mui/material';
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

      <Link to="#" className="sidebar-item">
      <Accordion  
      disableGutters
        elevation={0}
        sx={{
          padding: 0,
          margin: 0,
            '&:before': {
                display: 'none',
            }
        }}>
      <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          sx={{
            padding: 0,
            margin: 0,
          }}
        >
          <InsertChart className="icon" />
          <Typography className="sidebar-text"> Reports</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ mb: 0 }}>
          <Link to="/admin/users" className="sidebar_item_dropdown" sx={{ mb: 0 }}>
          <People className="icon" />
          <Typography className="sidebar-text"> Users</Typography>
        </Link>
        </AccordionDetails>
          

      </Accordion>
      </Link>

      <Link to="/admin/users" className="sidebar-item">
        <People className="icon" />
        <Typography className="sidebar-text"> Users</Typography>
      </Link>

      <Divider light  sx={{ mb: 2 }} className='divider'/>

      <Link to="/admin/notifications" className="sidebar-item">
        <Notifications className="icon" />
        <Typography className="sidebar-text"> Notifications</Typography>
      </Link>

      <Link to="/admin/settings" className="sidebar-item">
        <Settings className="icon" />
        <Typography className="sidebar-text"> Settings</Typography>
      </Link>

      <Divider light  sx={{ mb: 2 }} className='divider'/>

      <Link to="/admin/profile" className="sidebar-item">
        <Person className="icon" />
        <Typography className="sidebar-text"> Profile</Typography>
      </Link>

      <Link to="/admin/forum" className="sidebar-item">
        <Forum className="icon" />
        <Typography className="sidebar-text"> Chats </Typography>
      </Link>

      <Link to="/admin/" className="sidebar-item">
        <Logout className="icon" />
        <Typography className="sidebar-text"> Logout</Typography>
      </Link>


      <Divider light  sx={{ mb: 3 }} className='divider'/>

      {theme.palette.mode.toUpperCase()} Mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Container>
  );
}

export default Sidebar;

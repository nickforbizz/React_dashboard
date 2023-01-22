import {
  AccountCircle,
  Brightness4,
  Brightness7,
  CategoryOutlined,
  Dashboard,
  DirectionsBusOutlined,
  DirectionsCar,
  ExpandMore,
  Forum,
  InsertChart,
  Inventory2Outlined,
  Logout,
  MonetizationOnOutlined,
  Notifications,
  People,
  Person,
  Settings,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './sidebar.css';
import { ColorModeContext } from '../../context/ColorModeContext';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

function Sidebar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const signOut = async () => {
    
        try {
          const res = await logout();
          console.log(res);
          let code = res?.data?.code;
          if(code === 1){
            navigate('/login', { state: { from: location }, replace: true });
          }else{
            // :TODO
            // alert logout fail
          }
        } catch (err) {
          console.error(err);
          // navigate('/login', { state: { from: location }, replace: true });
        }
  
      
  }

  return (
    <Container className="sidebar">
      <div className="sidebar-item">
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            padding: 0,
            margin: 0,
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <AccountCircle className="icon" />
            <Typography className="sidebar-text"> { auth.user.name } </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ mb: 0 }}>
            <Link
              to="/admin/settings"
              className="sidebar_item_dropdown"
            >
              <Settings className="icon" sx={{ mb: 2 }}/>
              <Typography className="sidebar-text" sx={{ mb: 2 }}> Settings </Typography>
            </Link>
            <Link
              to="/admin/profile"
              className="sidebar_item_dropdown"
              sx={{ mb: 0 }}
            >
              <Person className="icon" />
              <Typography className="sidebar-text"> profile</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
      </div>
      <Link to="/admin/" className="sidebar-item">
        {/* <> */}
        <Dashboard className="icon" />
        <Typography className="sidebar-text"> Dashboard</Typography>
        {/* </Link> */}
      </Link>
      <div className="sidebar-item">
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            padding: 0,
            margin: 0,
            '&:before': {
              display: 'none',
            },
          }}
        >
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
            <Link
              to="/admin/users"
              className="sidebar_item_dropdown"
              sx={{ mb: 0 }}
            >
              <People className="icon" />
              <Typography className="sidebar-text"> Users</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
      </div>
      <Link to="/admin/users" className="sidebar-item">
        <People className="icon" />
        <Typography className="sidebar-text"> Users</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Link to="/admin/makes" className="sidebar-item">
        <DirectionsCar className="icon" />
        <Typography className="sidebar-text"> Makes</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Link to="/admin/models" className="sidebar-item">
        <DirectionsBusOutlined className="icon" /> 
        <Typography className="sidebar-text"> Models</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Link to="/admin/product_category" className="sidebar-item">
        <CategoryOutlined className="icon" />
        <Typography className="sidebar-text"> Product Category</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Link to="/admin/products" className="sidebar-item">
        <Inventory2Outlined className="icon" /> 
        <Typography className="sidebar-text"> Products</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />

      <Link to="/admin/sales" className="sidebar-item">
        <MonetizationOnOutlined className="icon" /> 
        <Typography className="sidebar-text"> Sales</Typography>
      </Link>
      <Divider light sx={{ mb: 2 }} className="divider" />
      
      <Link to="/admin/forum" className="sidebar-item">
        <Forum className="icon" />
        <Typography className="sidebar-text"> Chats </Typography>
      </Link>
      <Link onClick={signOut} className="sidebar-item">
        <Logout className="icon" />
        <Typography className="sidebar-text"> Logout</Typography>
      </Link>
      <Divider light sx={{ mb: 3 }} className="divider" />

      {theme.palette.mode.toUpperCase()} Mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Container>
  );
}

export default Sidebar;

import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { ColorModeContext } from '../../context/ColorModeContext';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
// import styles from './navbarfront.module.scss';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact', 'Login'];

function NavbarFront(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = (link) => {
    let link_url =
      link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`;

    let my_btn = link.toLowerCase() === 'login' ? <Button variant="contained" color="info">
      {link}
    </Button> : link;
    return (
      <Link to={link_url} >
        <ListItemText sx={{ color: '#080000' }} component="button" variant="contained" color="success" primary={my_btn} />
      </Link>
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ pt: 2, pb: 1 }}>
        Mk-D
      </Typography>
      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              {navLinks(item)}
            </ListItemButton>
          </ListItem>
        ))}
        <Divider light sx={{ mb: 3 }} className="divider" />
        {theme.palette.mode.toUpperCase()} Mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: 'flex', mb:5 }}>
        <AppBar component="nav" style={{ background: '#ffffff', color: '#080000' }}>
          <Container>

            <Toolbar disableGutters>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <Menu />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Auto-Mtumba Business Solutions
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                  <Button key={item}>
                    {navLinks(item)}
                  </Button>
                ))}

                <IconButton
                  sx={{ mr: 3 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </Box>


            </Toolbar>
          </Container>
        </AppBar>

        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default NavbarFront;

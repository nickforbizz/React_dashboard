import React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle, Mail, NotificationAdd } from '@mui/icons-material';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div>
      <AppBar position="fixed" className={styles.app_navbar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.logolg}>
            Mkenya-Daima
          </Typography>
          <Typography variant="h6" className={styles.logosm}>
            Mk-D
          </Typography>

          {/* <div className="search">
            <Search />
            <InputBase placeholder="Placeholder" />
          </div> */}

          <Box className={styles.icons}>
            <Badge badgeContent={4} color="success" className={styles.barge}>
              <Mail color="action" />
            </Badge>
            <Badge badgeContent={4} color="success" className={styles.barge}>
              <NotificationAdd color="action" />
            </Badge>

            <AccountCircle className='icon' />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

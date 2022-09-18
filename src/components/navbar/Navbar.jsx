import React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Toolbar,
  Typography,
} from '@mui/material';
import { Mail, NotificationAdd } from '@mui/icons-material';
import styles from './navbar.module.scss';

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

          <div className={styles.icons}>
            <Badge badgeContent={4} color="success" className={styles.barge}>
              <Mail color="action" />
            </Badge>
            <Badge badgeContent={4} color="success" className={styles.barge}>
              <NotificationAdd color="action" />
            </Badge>

            <Avatar alt="My Avator">N </Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

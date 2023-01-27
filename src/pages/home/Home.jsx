import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {  Typography } from '@mui/material';
import styles from './home.module.scss';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(3, 2),
//   },
//   image: {
//     width: '100%',
//   },
//   title: {
//     fontWeight: 'bold',
//     marginBottom: theme.spacing(2),
//   },
//   paragraph: {
//     marginBottom: theme.spacing(2),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function HeroSection() {
  // const classes = useStyles();

  return (
    <div className={styles.root}>
      
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className={styles.title}>
            Auto-Spares Sellers Package Space
          </Typography>
          <Typography variant="body1" className={styles.paragraph}>
          We help Automotive spares sellers improve business processes by automating their Store and Business Management Systems. Through our Tailor-Made Automotive Business solutions Package you can now keep track of spares in your shop and/or store and make them available to buyers easily.
          </Typography>
          <Button variant="contained" className={styles.my_button}>
            Sign in
          </Button>
          <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src='/imgs/hero-image.png' width="613" height="739" 
            alt={'/imgs/app_UI.png'}
            loading="lazy"
          />

        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

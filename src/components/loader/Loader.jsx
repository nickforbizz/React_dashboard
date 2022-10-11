import {  CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from './loader.module.scss';


  
  export default function Loader() {
  
    return (
      <Grid
        className={styles.root}
        alignItems="center"
        justify="center"
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress />
        </Box>
      </Grid>
    );
  }
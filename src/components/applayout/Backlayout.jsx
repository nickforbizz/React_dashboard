import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './backlayout.css';

function Backlayout({ children }) {
  return (
    <div className="back-layout">
      <Navbar />

      <Grid container className='app-container'>
        <Grid item xs={2} sm={2} className='box-shadow sidebar-container'>
          <Sidebar />
        </Grid>

        <Grid item xs={10} sm={10} className='sidebar-feed'>
          <main>
            <Outlet />
          </main>
        </Grid>
      </Grid>
    </div>
  );
}

export default Backlayout;

import {  KeyboardArrowUp, People } from '@mui/icons-material';
import { Badge, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './widget.css';

function Widget(props) {
  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={3} className="widget-container">
    

        <Grid container spacing={2} className='card-shadow inner-widget-container'>

          <Grid item xs={8} className='widget-left'>
            <Typography variant="h6" component="div" className="widget-left-item widget-left-text">
              USERS
            </Typography>
            <Badge badgeContent={'+'} color="info" className="widget-left-item barge">
              <Typography variant="h4" component="div" className="text-muted">
                99
              </Typography>
            </Badge>
            <Link href="#" className="widget-left-item widget-link"> View Users</Link>
          </Grid>

          <Grid item xs={4}>
            <div className="widget-right">
                <div className="widget-icon-top">
                    <KeyboardArrowUp className='icon-top'/>
                    2%
                </div>
                <div className="widget-icon-bottom">
                    <People className='icon-bottom'/>
                </div>
            </div>
          </Grid>

        </Grid>


      </Grid>
    </>
  );
}

export default Widget;

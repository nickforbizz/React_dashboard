import {  KeyboardArrowUp, People } from '@mui/icons-material';
import { Badge, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './widget.css';

function Widget(props) {
  let { link, icon, title='Model', data } = props;
  let active_records=0, inactive_records=0, active_percent =0;
  if(data){
    active_records = Object.values(data)[0];
    inactive_records = Object.values(data)[1];
    active_percent = +active_records === 0 ? 0 : parseInt((+active_records/(+active_records+ +inactive_records))*100);

  }



  let getRecords = () =>(
    active_records > 98 ? 
            <Badge badgeContent={'+'} color="info" className="widget-left-item barge">
              <Typography variant="h4" component="div" className="text-muted">
                {active_records}
              </Typography>
            </Badge>
            :
            <Typography variant="h4" component="div" className="text-muted">
                {active_records}
            </Typography>
  )


  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={3} className="widget-container">
    

        <Grid container spacing={2} className='card-shadow inner-widget-container'>

          <Grid item xs={8} className='widget-left'>
            <Typography variant="h6" component="div" className="widget-left-item widget-left-text">
              {title}
            </Typography>
             { getRecords()}
            
            <Link to={link} className="widget-left-item widget-link"> View {title}</Link>
          </Grid>

          <Grid item xs={4}>
            <div className="widget-right">
                <div className="widget-icon-top">
                    <KeyboardArrowUp className='icon-top'/>
                    Active: {active_percent}%
                </div>
                <div className="widget-icon-bottom">
                    {icon}
                </div>
            </div>
          </Grid>

        </Grid>


      </Grid>
    </>
  );
}

export default Widget;

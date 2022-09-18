import { Breadcrumbs, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
// import { Link } from 'react-router-dom';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';
import Chart from '../../../../components/charts/Chart';
import Featured from '../../../../components/featured/Featured';
import Widget from '../../../../components/widget/Widget';
import './homedash.scss';

function Homedash() {
  const breadcrumbs = [
        
    <Typography key="2" color="text.primary">
      Dashboard
    </Typography>,
  ];

  return (
    <div>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Home Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <Divider light  sx={{ mb: 2 }} className='divider'/>

      <Grid container className="widgets">
        <Widget />
        <Widget />
        <Widget />
        <Widget />
      </Grid>

      <Grid container className="widgets">
        <Grid  item xs={12} sm={4} md={4} lg={4}>
          <Featured />
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8}>
          <div className="card-shadow">
            <Chart aspect={2 / 1} title={`The Last 6 Months Revenue`} />
          </div>
        </Grid>
      </Grid>

      <div className="contain">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo
        cupiditate natus, optio incidunt quos deleniti voluptas temporibus earum
        fuga cumque adipisci nesciunt veniam fugiat error sunt facere sapiente
        magnam.
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo
        cupiditate natus, optio incidunt quos deleniti voluptas temporibus earum
        fuga cumque adipisci nesciunt veniam fugiat error sunt facere sapiente
        magnam.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo
        cupiditate natus, optio incidunt quos deleniti voluptas temporibus earum
        fuga cumque adipisci nesciunt veniam fugiat error sunt facere sapiente
        magnam.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo
        cupiditate natus, optio incidunt quos deleniti voluptas temporibus earum
        fuga cumque adipisci nesciunt veniam fugiat error sunt facere sapiente
        magnam.
      </div>
    </div>
  );
}

export default Homedash;

import { Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';

import './settings.css';

function Settings() {
  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Settings
    </Typography>,
  ];
  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
        Settings Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Divider light  sx={{ mb: 2 }} className='divider'/>
    </>
  );
}

export default Settings;

import { Divider, Link, Typography } from '@mui/material';
import React from 'react';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';

function Users() {
  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Users
    </Typography>,
  ];
  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Users Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <Divider light  sx={{ mb: 2 }} className='divider'/>
    </>
  );
}

export default Users;

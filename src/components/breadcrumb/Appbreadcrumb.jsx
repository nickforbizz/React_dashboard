import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs } from '@mui/material';
import React from 'react';

function Appbreadcrumb({ breadcrumbs }) {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        className='appbreadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </>
  );
}

export default Appbreadcrumb;

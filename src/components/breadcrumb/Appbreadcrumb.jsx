import React from 'react';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs } from '@mui/material';
import styles from './appbreadcrumb.module.css'

function Appbreadcrumb({ breadcrumbs }) {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        className={`${styles.nav} appbreadcrumb`}
      >
        {breadcrumbs}
      </Breadcrumbs> 
    </>
  );
}

export default Appbreadcrumb;

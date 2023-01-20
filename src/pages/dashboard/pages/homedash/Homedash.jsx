import React, { useState, useEffect } from 'react';
import { Launch, MonetizationOnOutlined, People } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';
import Chart from '../../../../components/charts/Chart';
import Datatable from '../../../../components/datatable/Datatable';
import Featured from '../../../../components/featured/Featured';
import useAxiosPrivate from '../../../../components/hooks/useAxiosPrivate';
import Widget from '../../../../components/widget/Widget';
import './homedash.scss';

function Homedash() {
  // states
  const [salesstats, setSalesstats] = useState({});
  const [usersstats, setUsersstats] = useState({});

  // hooks
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const SETTINGS_URL = 'api/settings/';


  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getStats = async () => {
      try {
        const res = await axiosPrivate.get(SETTINGS_URL+'stats', {
          signal: controller.signal,
        });
        console.log(res.data.users);
        isMounted && setSalesstats(res?.data?.sales);
        isMounted && setUsersstats(res?.data?.users);

      } catch (err) {
        console.error(err);
      }
    };



    getStats();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);


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

      <Divider light sx={{ mb: 2 }} className="divider" />

      <Grid container className="widgets">
        <Widget title={'Users'} data={usersstats} icon={<People className='icon-bottom'/>} />
         <Widget title={'Sales'} data={salesstats} icon={<MonetizationOnOutlined className='icon-bottom'/>} />
        {/*<Widget />
        <Widget /> */}
      </Grid>

      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <div className="card-shadow">
            <Chart aspect={3 / 1} title={`The Last 6 Months Revenue`} />
          </div>
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4}></Grid>
      </Grid>

      <Grid container alignItems="stretch">
        <Grid item component={Card} xs={12} sm={4} sx={{ m: 1 }}>
          <CardContent sx={{ p: 0 }}>
            <Featured />
          </CardContent>
          <CardActions>
            <Button variant="outlined" sx={{ borderRadius: 28, mt: 2 }}>
              Visit <Launch fontSize="small" sx={{ ml: 1 }} />
            </Button>
          </CardActions>
        </Grid>

        <Grid item component={Card} xs sx={{ m: 1 }}>
          <CardContent sx={{ p: 0 }}>
            <Datatable tb_title="Latest User to Register" pagination={4} />
          </CardContent>
          <CardActions>
            <Button variant="outlined" component={Link} to="/admin/users" sx={{ borderRadius: 28, mt: 2 }}>
              Visit <Launch fontSize="small" sx={{ ml: 1 }} />
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </div>
  );
}

export default Homedash;

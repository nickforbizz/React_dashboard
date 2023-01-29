import React, { useState, useEffect } from 'react';
import {
  DirectionsCar,
  Inventory2Outlined,
  Launch,
  MonetizationOnOutlined,
  People,
} from '@mui/icons-material';
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
import './homedash.css';
import moment from 'moment';

function Homedash() {

  console.log("am here");
  // states
  const [users, setUsers] = useState(null);
  const [salesStats, setSalesStats] = useState({});
  const [usersStats, setUsersStats] = useState({});
  const [productsStats, setProductsStats] = useState({});
  const [makesStats, setMakesStats] = useState({});

  // hooks
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const SETTINGS_URL = 'api/settings/';
  const USERS_URL = 'api/user/latest';
  let user_columns = [
    {
      name: '#',
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value, meta) => {
          return meta.rowIndex + 1;
        },
      },
    },
    {
      name: 'id',
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        align: 'center',
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, meta) => {
          return moment(value, 'YYYYMMDD').fromNow();
        },
      },
    },
  ];

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const getStats = async () => {
      try {
        const res = await axiosPrivate.get(SETTINGS_URL + 'stats', {
          signal: controller.signal,
        });
        console.log(res.data.users);
        isMounted && setSalesStats(res?.data?.sales);
        isMounted && setUsersStats(res?.data?.users);
        isMounted && setProductsStats(res?.data?.products);
        isMounted && setMakesStats(res?.data?.makes); 
      } catch (err) {
        console.error(err);
      }
    };

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal,
        });
        isMounted && setUsers(res?.data?.data);
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

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
        <Button
          variant="outlined"
          component={Link}
          to="/admin/businesses"
          sx={{ borderRadius: 28, m:2 }}
        >
          Businesses <Launch fontSize="small" sx={{ ml: 1 }} />
        </Button>
        </Typography>


        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <Divider light sx={{ mb: 2 }} className="divider" />

      <Grid container className="widgets">
        <Widget
          title={'Users'}
          data={usersStats}
          link={'users'}
          icon={<People className="icon-bottom" />}
        />
        <Widget
          title={'Products'}
          data={productsStats}
          link={'products'}
          icon={<Inventory2Outlined className="icon-bottom" />}
        />
        <Widget
          title={'Sales'}
          data={salesStats}
          link={'sales'}
          icon={<MonetizationOnOutlined className="icon-bottom" />}
        />
        <Widget
          title={'Makes'}
          data={makesStats}
          link={'makes'}
          icon={<DirectionsCar className="icon-bottom" />}
        />
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
            <Datatable
              tb_title="Latest User to Register"
              data={users && users.length > 0 ? users : null}
              columns={user_columns}
              pagination={4}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              component={Link}
              to="/admin/users"
              sx={{ borderRadius: 28, mt: 2 }}
            >
              Visit <Launch fontSize="small" sx={{ ml: 1 }} />
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </div>
  );
}

export default Homedash;

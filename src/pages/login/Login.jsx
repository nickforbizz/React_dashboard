import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import Appnormalform from '../../components/formcomponents/Appnormalform';
import Axios from '../../api/Axios';

function Login(props) {
  const LOGIN_URL = 'api/user/login';
  const { setAuth } = useContext(AuthContext);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  let form_template = {
    title: 'Login',
    fields: [
      {
        title: 'Email',
        type: 'email',
        name: 'email',
        field_id: 'email',
        validationProps: {
          required: 'Email is required',
        },
      },
      {
        title: 'Password',
        type: 'password',
        name: 'password',
        field_id: 'password',
        validationProps: {
          required: 'Password Name is required',
        },
      },
    ],
  };

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      let res = await Axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true, // this will require set of cors from origin
        }
      );
      let data = res?.data;
      let status = res?.statusText;
      data ? setAuth(data) : setErrMsg(status);
      console.log(res);
    } catch (error) {
      let err_msg = error?.response?.data;
      let err_status = error?.response?.status;
      setErrMsg(err_msg);
      console.error(err_msg);
      console.error(err_status);
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={8} sx={{ width: { xs: '80%', sm: '50%' } }}>
          {errMsg ? 
          <Paper className='red' sx={{p:2}}>
            <Typography
              variant="p"
              ref={errRef}
              className={` ${errMsg ? 'errmsg' : 'offscreen'}`}
            >
              {errMsg}
            </Typography>
          </Paper> : '' }
          <Appnormalform template={form_template} onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;

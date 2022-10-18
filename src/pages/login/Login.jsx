import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Appnormalform from '../../components/formcomponents/Appnormalform';
import Axios from '../../api/Axios';
import useAuth from '../../components/hooks/useAuth';
import { useForm } from 'react-hook-form';

function Login(props) {
  const LOGIN_URL = 'api/auth/login';
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/admin'
  // const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');


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
          withCredentials: true, // this will require set of cors from origin
        }
      );
      let data = res?.data;
      let status = res?.statusText;
      if(data) {
        setAuth(data) 
        Axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
        navigate(from, { replace: true })
      }else{
        setErrMsg(status);
      } 
    } catch (error) {
      let err_msg = error?.response?.data || "Fatal Error Occured";
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
          {errMsg ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errMsg}
            </Alert>
          ) : (
            ''
          )}
          <Appnormalform template={form_template} onSubmit={onSubmit} useForm={useForm} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;

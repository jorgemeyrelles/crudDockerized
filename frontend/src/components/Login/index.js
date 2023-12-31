import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, IconButton, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import { GlobalContext } from '../../Context/StageGlobal';
import Alerts from '../Alert';

// import { Container } from './styles';

function ToLogin() {
  const [insertOne, setInsertOne] = useState({ username: '', password: '' });
  const [valid, setValid] = useState(true);
  const [err, setErr] = useState({ alert: false, value: { title: '', type: '', msg: '' } });
  const { setLogin } = useContext(GlobalContext);

  const navigate = useNavigate();

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  useEffect(() => {
    const { email, password } = insertOne;
    const checkPassword = password.length >=6 && password.length <= 8;
    const checkUsername = validateEmail(email);
    if (err.alert) {
      setErr(({ alert: false, value: { title: '', type: '', msg: '' } }));
    }
    if (checkPassword && checkUsername) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [insertOne]);  

  const handleChange = ({ name, value }) => {
    setInsertOne((e) => ({ ...e, [name]: value }));
  };

  const handleClick = (e) => {
    try {
      console.log(e);
      setErr({ alert: false, value: { title: '', type: '', msg: '' } });
      console.log(e);
      if (e.email !== '') {
        api.getLogin(e)
          .then((response) => {
            console.log(response);
            if (response.name === 'AxiosError') {
              setErr({ alert: true, value: {
                title: "Erro ao logar",
                type: "error",
                msg: "username/password incorreto(s)",
              } });
              throw Error;
            };
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('check', true);
            setLogin(true);
            navigate(`/home/${response.data.id}`);
          });
      }
    } catch (error) {
      console.error(error);
      setErr({ alert: true, value: {
        title: "Erro ao logar",
        type: "error",
        msg: "username/password incorreto(s)",
      } });
      navigate("/");
    }
  };

  return (
    <Box
      style={{
        maxWidth: '300px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '15px',
        position: 'absolute',
        top: '20%',
        left: '10%',
      }}
    >
      <FormControl   style={{ width: '100%' }}>
        <Typography
          variant='h6'
          style={{  alignSelf: 'center' }}
          id="demo-radio-buttons-group-label"
        >
          Login
        </Typography>
        <TextField
          type="text"
          style={{ padding: '10px' }}
          onChange={(e) => handleChange(e.target)}
          id="outlined-basic"
          name="email"
          label="email"
          variant="outlined"
          required
        />
        <TextField
          type="password"
          onChange={(e) => handleChange(e.target)}
          style={{ padding: '10px' }}
          id="outlined-basic"
          name="password"
          label="password"
          variant="outlined"
          required
        />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Button
            variant="contained"
            type='submit'
            onClick={() => handleClick(insertOne)}
            disabled={valid}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Registrar
          </Button>
        </div>
      </FormControl>
      {err.alert && (
      <Alerts
        title={err.value.title}
        type={err.value.type}
        msg={err.value.msg}
      />)}
    </Box>
  );
}

export default ToLogin;
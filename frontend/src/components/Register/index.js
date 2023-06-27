import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import Alerts from '../Alert';

// import { Container } from './styles';

function ToRegister() {
  const [insertOne, setInsertOne] = useState({ username: '', password: '', repetePassword: '' });
  const [valid, setValid] = useState(true);
  const [err, setErr] = useState({ alert: false, value: { title: '', type: '', msg: '' } });

  const navigate = useNavigate();

  useEffect(() => {
    const { username, password, repetePassword } = insertOne;
    const checkPassword = password.length >=6 && password.length <= 8;
    const checkUsername = username.length >= 6 && username.length <= 15;
    const checkRepete = password === repetePassword;
    if (err.alert) {
      setErr(({ alert: false, value: { title: '', type: '', msg: '' } }));
    }
    if (checkPassword && checkUsername && checkRepete) {
      setValid(false);
    }
  }, [insertOne]);

  const handleChange = ({ name, value }) => {
    setInsertOne((e) => ({ ...e, [name]: value }));
  };

  const checkUserExist = async (e) => {
    const response = await api.getUser(e);
    if (response.message === 'User exist' || response.name === 'AxiosError') {
      setErr({ alert: true, value: {
        title: "Erro ao registrar",
        type: "error",
        msg: "usuário já existe!",
      } });
      return navigate("/register");
    };
    return e;
  };

  const goToRegister = async (e) => {
    const res = await api.postRegister(e);
    localStorage.clear();
    if (res.name === 'AxiosError') {
      setErr({ alert: true, value: {
        title: "Erro ao registrar",
        type: "error",
        msg: "Entrar em contato com administrador!",
      } });
      return navigate("/register");
    };
    localStorage.setItem('user', JSON.stringify({ data: e }));
    localStorage.setItem('check', true);
    return navigate("/home");
  };

  const handleClick = (e) => {
    if (e.username !== '') {
      checkUserExist(e);
      const register = goToRegister(e);
      return register;
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
      <FormControl style={{ width: '100%' }}>
        <Typography
          variant='h6'
          style={{  alignSelf: 'center' }}
          id="demo-radio-buttons-group-label"
        >
          Registrar
        </Typography>
        <TextField
          type="text"
          style={{ padding: '10px' }}
          onChange={(e) => handleChange(e.target)}
          id="outlined-basic"
          name="username"
          label="username"
          variant="outlined"
          placeholder='Min de 6 e Máx de 15'
          required
        />
        <TextField
          type="text"
          onChange={(e) => handleChange(e.target)}
          style={{ padding: '10px' }}
          id="outlined-basic"
          name="password"
          label="password"
          variant="outlined"
          placeholder='Min. de 6 e Max. de 8 '
          required
        />
        <TextField
          type="text"
          onChange={(e) => handleChange(e.target)}
          style={{ padding: '10px' }}
          id="outlined-basic"
          name="repetePassword"
          label="repetir o password"
          variant="outlined"
          required
          placeholder='Repetir password'
        />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Button
            variant="contained"
            onClick={() => handleClick(insertOne)}
            disabled={valid}
          >
            Registrar
          </Button>
          <IconButton
            onClick={() => navigate("/login")}
            color="primary"
            aria-label="add to shopping cart"
          >
            <ReplyAllIcon />
          </IconButton>
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

export default ToRegister;
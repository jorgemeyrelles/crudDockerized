import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export default function MainContainer({children}) {
  const navigate = useNavigate();

  const matches = useMediaQuery('(min-width:1200px)');

  const check = JSON.parse(localStorage.getItem('check'));
  const pathname = window.location.pathname === "/register";
  useEffect(() => {
    if ((check === null && !check) && !pathname) {
      localStorage.clear();
      navigate("/login");
    }
    if (check) {
      navigate("/home");
    }
  }, [check]);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ maxWidth: matches && 'none' }} maxWidth="xl">
        <Box
          sx={{ bgcolor: '#cfe8fc', height: '100vh' }}
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}

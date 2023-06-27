import React from 'react';
import { AppBar, Typography, useMediaQuery } from '@mui/material';

// import { Container } from './styles';

function HeaderTable() {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <AppBar
      position="relative"
      style={{
        padding: '10px 0',
        display: '-webkit-inline-box',
        borderRadius: '10px 10px 0 0',
        }}
      sx={{ width: '90%' }}
    >
      <div
        style={{
          fontFamily: 'roboto',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          left: '10%',
          width: '40%',
          }}
        >
        <Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: !matches ? 400 : 700,
              letterSpacing: matches && '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Nome
          </Typography>
          <Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: !matches ? 400 : 700,
              letterSpacing: matches && '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CPF
          </Typography>
          {matches && (<Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tipo
          </Typography>)}
          {matches && (<Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Contato
          </Typography>)}
        </div>
        {matches && (<div
          style={{
            fontFamily: 'roboto',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            right: '10px',
            width: '13%',
            }}
          >
          <Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Editar
          </Typography>
          <Typography
            variant="p"
            noWrap
            component="div"
            href=""
            sx={{
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Deletar
          </Typography>
        </div>)}
    </AppBar>
  );
}

export default HeaderTable;
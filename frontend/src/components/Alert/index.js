import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Alerts(props) {
  const { title, type, msg } = props;

  return (
    <Stack
      style={{ position: 'fixed', top: '10%', left: '32%' }}
      sx={{ width: '40%' }}
      spacing={2}
    >
      <Alert variant="filled" severity={type}>{`${title}: ${msg}`}</Alert>
    </Stack>
  );
};

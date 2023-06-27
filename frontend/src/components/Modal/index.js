import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../service/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [tel, setTel] = useState(false);
  const [mail, setMail] = useState(false);
  const [insertOne, setInsertOne] = useState({ tipo: 'Telefone', descricao: '' });
  const [oneMore, setOneMore] = useState(false);
  const handleClose = () => show({ display: false, data: [] });
  const matches = useMediaQuery('(min-width:600px)');

  const { value, show } = props;
  useEffect(() => {
    if (value.display) {
      const hasTel = value.data.filter((e) => e.tipo === 'Telefone' && e);
      const hasEmail = value.data.filter((e) => e.tipo === 'Email' && e);

      setTel(hasTel);
      setMail(hasEmail);
    }
  }, [props]);

  const handleChange = ({ name, value }) => {
    setInsertOne((e) => ({ ...e, [name]: value }));
  };

  const handleClick = (send) => {
    if (send.descricao !== '') {
      api.postOneContact({ ...send, ...insertOne });
      handleClose();
    }
    setOneMore(false);
  };

  const ButtonVar = () => {
    if (matches) {
      return (
        <Button
          color="primary"
          variant="outlined"
          endIcon={<ControlPointIcon />}
          onClick={() => setOneMore(true)}
          style={{ padding: '10px', position: 'absolute', right: '2%' }}
        >
          Incluir
        </Button>
      );
    }
    return (
      <IconButton
        color="primary"
        aria-label="insert contact"
        component="label"
        onClick={() => setOneMore(true)}
        style={{ padding: '10px', position: 'absolute', right: '10%' }}
      >
        <ControlPointIcon sx={{ fontSize: 40 }} />
      </IconButton>
    );
  };

  return (
    <div>
      <Modal
        open={value.display}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: matches && 350 }}>
          {!oneMore && (ButtonVar())}
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {value.display && value.data[0].nome}
          </Typography>
          {!oneMore && <Typography id="modal-modal-title" variant="h6" component="h2">
            Telefone
          </Typography>}
          {(tel.length > 0 && !oneMore) && tel.map((e, i) => (
            <div id={`id-${i + 1}`}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {e.descricao}
              </Typography>
            </div>
          ))}
          {!oneMore && <Typography id="modal-modal-title" variant="h6" component="h2">
            E-mail
          </Typography>}
          {(!oneMore && mail.length > 0) && mail.map((e, i) => (
            <div id={`id-${i + 1}`}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {e.descricao}
              </Typography>
            </div>
          ))}
          {oneMore && (<Box
            style={{ border: '2px solid #000', borderRadius: '5px' }}
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <FormLabel id="demo-radio-buttons-group-label">Incluir contato</FormLabel>
              <IconButton
                style={{ position: 'absolute', right: '5%' }}
                aria-label="delete" size="small"
                onClick={() => setOneMore(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Telefone"
                name="radio-buttons-group"
                onChange={(e) => handleChange(e.target)}
              >
                <FormControlLabel name="tipo" value="Telefone" control={<Radio />} label="Telefone" />
                <FormControlLabel name="tipo" value="Email" control={<Radio />} label="E-mail" />
              </RadioGroup>
              <div style={{ display: 'flex', width: '100%' }}>
                <TextField
                  type={insertOne.tipo === 'Email' ? "email" : "number"}
                  sx="xl"
                  onChange={(e) => handleChange(e.target)}
                  id="outlined-basic"
                  name="descricao"
                  label="Descrição"
                  variant="outlined"
                />
                <IconButton
                  color="primary"
                  aria-label="insert one"
                  component="label"
                  sx="xl"
                  style={{ width: '56px', marginLeft: '5%' }}
                  onClick={() => handleClick({ idPessoa: value.data[0].id, nome: value.data[0].nome })}
                >
                  <CheckCircleIcon sx="xl" fontSize='large' />
                </IconButton>
              </div>
            </FormControl>
          </Box>)}
        </Box>
      </Modal>
    </div>
  );
};

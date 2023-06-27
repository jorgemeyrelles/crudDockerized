import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { api } from '../../service/api';
import { GlobalContext } from '../../Context/StageGlobal';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    borderRadius: '10px',
  },
}));

export default function InsertButton() {
  const [open, setOpen] = useState(false);
  const [insertOne, setInsertOne] = useState({
    nome: '',
    cpf: '',
    tipo: 'Telefone',
    descricao: '',
  });
  const { setNewInList } = useContext(GlobalContext);
  
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleChange = ({ name, value }) => {
    setInsertOne((e) => ({ ...e, [name]: value }));
  };

  const handleClick = (e) => {
    if (e.nome !== '') {
      api.postOnePerson(e)
        .then((response) => console.log(response));
      setNewInList('one');
    }
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => handleTooltipClose()}>
      <Stack
        spacing={2}
        style={{
          position: 'absolute',
          right: '20%',
          marginTop: '3%',
        }}
      >
        <HtmlTooltip
          // onClose={handleTooltipClose}
          placement="bottom-start"
          open={open}
          title={
            <div>
              <FormControl style={{ width: '100%' }}>
                <FormLabel id="demo-radio-buttons-group-label">Novo Cliente</FormLabel>
                <TextField
                  type="text"
                  style={{ padding: '10px' }}
                  onChange={(e) => handleChange(e.target)}
                  id="outlined-basic"
                  name="nome"
                  label="Nome"
                  variant="outlined"
                  required
                />
                <TextField
                  type="number"
                  onChange={(e) => handleChange(e.target)}
                  style={{ padding: '10px' }}
                  id="outlined-basic"
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  required
                />
                <Typography style={{ paddingLeft: '10px' }}>
                  Tipo
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Telefone"
                  name="radio-buttons-group"
                  style={{ paddingLeft: '10px' }}
                  onChange={(e) => handleChange(e.target)}
                >
                  <FormControlLabel name="tipo" value="Telefone" control={<Radio />} label="Telefone" />
                  <FormControlLabel name="tipo" value="Email" control={<Radio />} label="E-mail" />
                </RadioGroup>
                <div style={{ display: 'flex', width: '100%' }}>
                  <TextField
                    style={{ padding: '10px' }}
                    type={insertOne.tipo === 'Email' ? "email" : "number"} 
                    onChange={(e) => handleChange(e.target)}
                    id="outlined-basic"
                    name="descricao"
                    label="Descrição"
                    variant="outlined"
                    required
                  />
                  <IconButton
                    color="primary"
                    aria-label="insert one"
                    component="label"
                    sx="xl"
                    style={{ width: '56px', marginLeft: '5%' }}
                    onClick={() => handleClick(insertOne)}
                  >
                    <CheckCircleIcon sx="xl" fontSize='large' />
                  </IconButton>
                </div>
              </FormControl>
            </div>
          }
        >
          <Button
          onClick={() => handleTooltipOpen()}
          variant="contained"
          endIcon={<SendIcon />}
          >
            Novo
          </Button>
        </HtmlTooltip>
      </Stack>
    </ClickAwayListener>
  );
};

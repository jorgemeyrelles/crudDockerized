import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HeaderTable from '../HeaderTable';
import { api } from '../../service/api';
import BasicModal from '../Modal';
import { GlobalContext } from '../../Context/StageGlobal';
import { DataGrid } from '@mui/x-data-grid';

export default function ListHome() {
  const [checked, setChecked] = useState([1]);
  const [list, setList] = useState({
    valid: false,
    data: [{ nome: '', id: '', descricao: '', cpf: '', tipo: '' }],
  });
  const [arr, setArr] = useState([]);
  const [open, setOpen] = useState({ display: false, data: [] });

  const { newInList } = useContext(GlobalContext);

  const matches = useMediaQuery('(min-width:600px)');

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClickOne = (id) => {
    api.getOneFromList(id)
      .then((response) => setOpen({ display: true, data: response.data }));
    // return setOpen({ display: true, data: res });
  };

  useEffect(() => {
    api.getList()
      .then((response) => {
        setArr(response.data);
      });
  }, [newInList]);

  useEffect(() => {
    const check = {};
    arr.length > 0 && arr.map((e) => {
      return check[e.id] = e;
    });
    if (!list.valid && Object.values(check).length > 0) {
      setList({
        valid: true,
        data: Object.values(check),
      })
    }
  }, [arr, newInList]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 150,
      editable: true,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 110,
      editable: true,
    },
    {
      field: 'descricao',
      headerName: 'Contato',
      description: 'Pode haver mais de um tipo de contato. Acesse o usuário.',
      sortable: false,
      width: 160,
    },
  ];

  const rows = list.valid && list.data.map(({ id, nome, cpf, tipo, descricao }) => (
    { id, nome, cpf, tipo, descricao }
  ));
  console.log(rows, list);

  return (
    <Box style={{
      textAlign: '-webkit-center',
      position: 'relative',
      top: '15%',
      height: '70%',
      overflow: 'auto',
      }}
    >
      <HeaderTable />
      <BasicModal value={open} show={setOpen} />
      <List dense sx={{ width: '100%', maxWidth: '90%', maxHeight: '80%', bgcolor: 'background.paper' }}>
        {list.valid && list.data.map(({ id, nome, cpf, tipo, descricao }) => {
          const labelId = `checkbox-list-secondary-label-${id}`;
          return (
            <ListItem
              key={id}
              secondaryAction={
                <div>
                  <IconButton color="primary">
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              }
              disablePadding
            >
              <ListItemButton
                style={{ maxWidth: '90%' }}
                onClick={() => handleClickOne(id)}
              >
                <ListItemAvatar sx={{ width: !matches ? 24 : 40, height: !matches ? 24 : 40, marginRight: !matches && '-25px' }}>
                  <Avatar
                    alt={`${nome[0]}`}
                    src={`...`}
                    sx={{ width: !matches ? 24 : 40, height: !matches ? 24 : 40 }}
                  />
                </ListItemAvatar>
                <ListItemText style={{ width: '8%' }} id={labelId} primary={nome} />
                {!matches && <ListItemText style={{ width: '8%' }} id={labelId} primary={cpf} />}
                {matches && <ListItemText style={{ width: '5%' }} id={labelId} primary={tipo} />}
                {matches && <ListItemText style={{ width: '10%' }} id={labelId} primary={descricao} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

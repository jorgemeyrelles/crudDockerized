const express = require('express');
const dev = require('./routes/dev');
const users = require('./routes/users');
const lists = require('./routes/lists');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

const sequelize = require('./utils/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  next();
});

app.use('/dev', dev);
app.use('/login', users);
app.use('/list', lists);

async function connect() {
  try {
    await sequelize.sync({ force: false });
    console.log(`Rodando na porta => ${process.env.EXTERNAL_PORT || 3001}`);
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
};

connect();
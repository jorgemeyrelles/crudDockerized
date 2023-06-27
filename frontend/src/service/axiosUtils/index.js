import axios from 'axios';

const { REACT_APP_API, NODE_ENV } = process.env;

// let BASE_URL = REACT_APP_API;

// const BASE_URL_LOCAL = 'http://localhost:3001/api/v1';

const environment = {
  development: "http://localhost:3001/api/v1",
  production: REACT_APP_API,
}
console.log(environment[NODE_ENV]);

export const axiosInstance = axios.create({
  baseURL: environment.production,
  headers: {
    'Content-type': 'application/json',
  },
});
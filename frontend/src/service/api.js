// import axios from "axios";
import { axiosInstance } from "./axiosUtils";

export const api = {
  getList: async (idUser) => {
    try {
      const clients = await axiosInstance.request({
        method: 'GET',
        url: `list/${idUser}/all`,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  getOneFromList: async (value, idUser) => {
    try {
      const clients = await axiosInstance.request({
        method: 'GET',
        url: `list/${idUser}`,
        params: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  postOneContact: async (value, idUser) => {
    try {
      const clients = await axiosInstance.request({
        method: 'POST',
        url: `list/${idUser}/contact`,
        params: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  postOnePerson: async (value, idUser) => {
    try {
      const clients = await axiosInstance.request({
        method: 'POST',
        url: `list/${idUser}`,
        params: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  getLogin: async (value) => {
    try {
      const clients = await axiosInstance.request({
        method: 'GET',
        url: 'login/one/',
        params: value,
      });
      return clients;
    } catch (error) {
      return error;
    }
  },
  getUser: async (value) => {
    try {
      const clients = await axiosInstance.request({
        method: 'GET',
        url: 'login/one',
        body: { data: value },
        config: value,
        data: value,
        params: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  postRegister: async (value) => {
    try {
      const clients = await axiosInstance.request({
        method: 'POST',
        url: 'login',
        config: value,
        data: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
  editUser: async (value, idUser) => {
    try {
      const clients = await axiosInstance.request({
        method: 'PUT',
        url: `login/${idUser}`,
        config: value,
        data: value,
        params: value,
      });
      return clients.data;
    } catch (error) {
      return error;
    }
  },
};
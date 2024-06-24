import axios from "axios";


const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

let token = JSON.parse(window.localStorage.getItem('token'))


  instance.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config
  })



export default instance;

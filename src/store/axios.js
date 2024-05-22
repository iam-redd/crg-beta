import axios from "axios";
import backend from '../default.json'


const instance = axios.create({
  baseURL: backend.backendUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});
const config = {

};
let token = JSON.parse(window.localStorage.getItem('token'))


  instance.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config
  })



export default instance;

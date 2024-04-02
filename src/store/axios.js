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

instance.interceptors.request.use((config)=> {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config
})



export default instance;

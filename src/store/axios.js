import axios from "axios";
import backend from '../default.json'

const instance = axios.create({
    baseURL: backend.backendUrl
});

instance.interceptors.request.use((config)=> {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config
})



export default instance;

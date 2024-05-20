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
console.log(token)
// if (token.split('')[0] === '"'){
//   token = token.split('').splice(0,1)
// }
// const temp = token.split('')
// if (temp[temp.length - 1] === '"'){
//   token = temp.splice(temp.length - 1,1)
// }


  instance.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config
  })



export default instance;

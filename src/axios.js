import axios from "axios";

const instance = axios.create({
  baseURL: "https://capstone-health.herokuapp.com",
});
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');


export default instance;
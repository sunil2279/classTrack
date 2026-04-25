import axios from 'axios';


export let BASE_URL = "http://localhost:9000/api"
export  let clientServer =  axios.create({
    baseURL: BASE_URL
});


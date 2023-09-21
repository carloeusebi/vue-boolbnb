import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL,
    headers:{
        Accept: 'application/json',
    },
    withCredentials: true,
})

export {axiosInstance}
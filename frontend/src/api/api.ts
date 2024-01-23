import axios from 'axios';

const axiosParams = {
    baseURL: 'http://localhost:8080/api/v1/',
};

const api = axios.create(axiosParams);

export default api;

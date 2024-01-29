import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = 'http://localhost:8080/api/v1/';

const api: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

const setJwtHeader = (jwtToken: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
};

var jwt = localStorage.getItem('token');
if (jwt) setJwtHeader(jwt);

export { api, setJwtHeader };

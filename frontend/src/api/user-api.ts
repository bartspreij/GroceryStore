import { LoginRequest } from '../domain/LoginRequest';
import { User } from '../domain/user';
import axios from './axios';

export const postUser = (userData: User) => {
    return axios.post<User>('/users', userData);
};

export const fetchUser = (id: number) => {
    return axios.get(`/users/${id}`);
};

export const loginUser = (loginRequest: LoginRequest) => {
    return axios.post('/auth', loginRequest);
};

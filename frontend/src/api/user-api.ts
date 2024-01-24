import { User } from '../domain/user';
import axios from './axios';

export const postUser = (userData: User) => {
    return axios.post<User>('/users', userData);
};

export const fetchUser = (id: number) => {
    axios.get(`/users/${id}`);
};

import { User } from '../domain/user';
import api from './api';

export const postUser = (userData: User) => {
    return api.post<User>('/users', userData);
};

export const fetchUser = (id: number) => {
    api.get(`/users/${id}`);
};

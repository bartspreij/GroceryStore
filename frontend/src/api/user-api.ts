import { LoginRequest } from '../domain/LoginRequest';
import { User } from '../domain/user';
import { api } from './api';

export const postUser = (userData: User) => {
    return api.post<User>('/users', userData);
};

export const fetchUser = (id: number) => {
    return api.get(`/users/${id}`);
};

export const loginUser = (loginRequest: LoginRequest) => {
    return api.post('/auth', loginRequest);
};

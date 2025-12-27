import api from './axios';
import type { UserLoginForm, UserRegistrationForm } from '../lib/validation';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    message: string;
}

export const login = async (data: UserLoginForm) => {
    const response = await api.post<AuthResponse>('/login', data);
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        // You might want to store user details too or fetch them
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const register = async (data: UserRegistrationForm) => {
    const response = await api.post<AuthResponse>('/register', data);
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr) as User;
    return null;
};

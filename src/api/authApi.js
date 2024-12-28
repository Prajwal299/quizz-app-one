import apiClient from '../utils/apiClient';

export const login = (credentials) => apiClient.post('/login', credentials);
export const register = (data) => apiClient.post('/register', data);

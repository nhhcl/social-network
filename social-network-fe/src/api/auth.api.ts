import api from './axios';

export const loginApi = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const refreshTokenApi = () =>
  api.post('/auth/refresh');

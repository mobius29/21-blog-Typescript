import client from './client';

interface User {
  username: string;
  password: string;
}

export const login = ({ username, password }: User) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ username, password }: User) =>
  client.post('/api/auth/register', { username, password });

export const check = () => client.get('/api/auth/check');

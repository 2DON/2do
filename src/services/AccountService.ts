import { AxiosResponse } from 'axios';
import api from '../api';
import { auth } from '../context/AuthContext';

export async function exists(email: string): Promise<boolean> {
  return (await api.get(`/accounts/exists/${encodeURIComponent(email)}`)).data;
}

export async function info(): Promise<Account> {
  return (await api.get('/accounts/info', { headers: auth() })).data;
}

export async function edit(
  changes: FormData
): Promise<Promise<AxiosResponse<Account>>> {
  return api.patch('/accounts/edit', changes, { headers: auth() });
}

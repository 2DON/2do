import api from '../api';
import { TOKEN_HEADER } from '../config';

const HEADER = TOKEN_HEADER.toLowerCase();

export async function signIn(email: string, password: string): Promise<string> {
  const response = await api.post('/accounts/sign-in', { email, password });

  return response.headers[HEADER];
}

export async function signUp(
  email: string,
  password: string
): Promise<string | number> {
  return (await api.post('/accounts/sign-up', { email, password })).status;
}

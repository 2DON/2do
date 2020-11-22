import api from '../api';
import { TOKEN_HEADER } from '../config';
import { CONFLICT, OK } from '../utils/Status';

const HEADER = TOKEN_HEADER.toLowerCase();

/**
 * @throws
 * 
 * NOT_FOUND      account not found
 * 
 * LOCKED         not verified
 * 
 * UNAUTHORIZED   invalid password
 */
export async function signIn(email: string, password: string): Promise<string> {
  const { status, headers } = await api.post(
    '/auth/sign-in', 
    { email, password });

  if (status === OK) {
    return headers[HEADER];
  } else {
    throw status;
  }
}

/**
 * @throws
 * 
 * BAD_REQUEST     invalid request
 * 
 * CONFLICT        email already in use
 */
export async function signUp(email: string, 
                             password: string, 
                             name?: string, 
                             options?: string): Promise<void> {
  const { status } = await api.post(
    '/auth/sign-up', 
    { email, password, name, options });

  if (status === CONFLICT) {
    return;
  } else {
    throw status;
  }
}

/**
 * @throws
 * 
 * NOT_FOUND       account not found
 * 
 * UNAUTHORIZED    account is already verified
 * 
 * CONFLICT        email already in use
 */
export async function signUpFixEmail(email: string, 
                                     newEmail: string): Promise<void> {
  const { status } = await api.post(
    `/auth/sign-up/${encodeURIComponent(email)}`, 
    { ["new-email"]: newEmail });

  if (status === OK) {
   return; 
  } else {
    throw status;
  }
}

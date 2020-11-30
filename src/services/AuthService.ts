import api, { _ } from '../api';
import { TOKEN_HEADER } from '../config';
import { CREATED, OK } from '../utils/Status';

const HEADER = TOKEN_HEADER.toLowerCase();

/**   
 * @throws
 * - NOT_FOUND      account not found
 * - LOCKED         not verified
 * - UNAUTHORIZED   invalid password
 */
export async function signIn(email: string, password: string): Promise<string> {
  const { status, headers } = await _(api.post('/auth/sign-in', { email, password }));
  
  if (status === OK) {
    return headers[HEADER];
  } else {
    throw status;
  }
}

/**
 * @param email     string
 * @param password  string
 * @param name      ?string
 * @param options   ?string
 * 
 * @throws
 * - BAD_REQUEST    invalid request
 * - CONFLICT       email already in use
 */
export async function signUp(body: FormData): Promise<void> {
  const { status } = await  _(api.post('/auth/sign-up', body));

  if (status !== CREATED) {
    throw status;
  }
}

/**
 * @param new-email  string
 * 
 * @throws
 * - NOT_FOUND       account not found
 * - UNAUTHORIZED    account is already verified
 * - CONFLICT        email already in use
 */
export async function signUpFixEmail(email: string, body: FormData): Promise<void> {
  const { status } = await _(api.post(`/auth/sign-up/${encodeURIComponent(email)}`, body));

  if (status !== OK) {
    throw status;
  }
}

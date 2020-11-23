import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';

export async function exists(email: string): Promise<boolean> {
  const { status, data } = await _(api.get(`/accounts/exists/${encodeURIComponent(email)}`));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

export async function find(...ids: number[]): Promise<Account[]> {
  const { status, data } = await _(
    api.get('/accounts', { headers: auth(), params: { ids: ids.join(',') } }))

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

export async function me(): Promise<Account> {
  const { status, data } = await _(api.get('/accounts/me', { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}


/**
 * @param email     ?string
 * @param password  ?string
 * @param name      ?string
 * @param options   ?string
 * 
 * @throws
 * - BAD_REQUEST    
 *        !Patterns.EMAIL.matches(email) || email.length() > 45
 *        password.length() < 8 || password.getBytes().length > 72
 *        name.length() < 1 || name.length() > 45
 * - CONFLICT       email already in use
 */
export async function update(body: FormData): Promise<Account> {
  const { status, data } = await _(api.patch('/accounts/me', body, { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * accepted mime-types: "image/png", "image/jpeg", "application/octet-stream"
 * 
 * @param avatar    ?Blob
 * 
 * @throws
 * - BAD_REQUEST    already in use
 */
export async function updateAvatar(body: FormData): Promise<Account> {
  const { status, data } = await _(api.put('/accounts/me/avatar', body, { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param password   string
 * 
 * @throws
 * - UNAUTHORIZED    incorrect password
 */
export async function destroy(body: FormData): Promise<void> {
  const { status } = await _(api.delete('/accounts/me', { headers: auth(), data: body }));

  if (status !== OK) {
    throw status;
  }
}

export async function mockPremium() {
  const { status } = await _(api.get('/accounts/me/mock-premium'));

  if (status !== OK) {
    throw status;
  }
}

import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';
import Keyv from 'keyv'

export async function exists(email: string): Promise<boolean> {
  const { status, data } = await _(api.get(`/accounts/exists/${encodeURIComponent(email)}`));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

export async function find(...ids: number[]): Promise<PublicAccount[]> {
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

const accountCache = new Keyv<PublicAccount>();
export async function findAndCache(...ids: number[]): Promise<void> {
  if (!ids.length) return;

  for(const account of await find(...ids)) {
    await accountCache.set(String(account.id), account, /* 30min */ 1800000)
  }
}

export async function findCached(...ids: number[]): Promise<Map<number, PublicAccount>> {
  const accounts = new Map<number, PublicAccount>()

  if (!ids) return accounts;

  // get cache if not expired
  for(const id of ids) {
    const account = await accountCache.get(String(id));
    if (account) {
      accounts.set(id, account)
      ids.splice(ids.indexOf(id), 1)
    }
  }

  // fetch what are not present or expired
  await findAndCache(...ids);
  
  // run again, but now with the items cached
  for(const id of ids) {
    const account = await accountCache.get(String(id));
    if (account) {
      accounts.set(id, account)
      ids.splice(ids.indexOf(id), 1)
    }
  }

  if (ids.length > 0) console.warn(`error finding accounts with the following ids: ${ids}`);
  return accounts;
}

export async function findOneCached(id: number | undefined): Promise<PublicAccount | undefined> {
  if (!id) return;

  return (await findCached(id)).get(id);
}

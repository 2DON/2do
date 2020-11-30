import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';
import { IdCached } from '../utils/Cached';

export async function exists(email: string): Promise<boolean> {
  const { status, data } = await _(api.get(`/accounts/exists/${encodeURIComponent(email)}`));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

export async function find(...ids: number[] | string[]): Promise<PublicAccount[]> {
  if (!ids.length) return [];

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

class PublicAccountCache extends IdCached<PublicAccount> {

  protected idOf(entity: PublicAccount): number {
    return entity.id;
  }

  async cacheAll(...ids: number[]): Promise<void> {
    const notFound = new Set()

    for (const id of ids) {
      if (!await this.get(id)) {
        notFound.add(id)
      }
    }

    for (const account of await find(...notFound)) {
      await this.add(account)
      notFound.delete(account.id)
    }

    if (notFound.size) {
      console.warn(`-> cacheAll - not found: ${[...notFound].join(',')}`)
    }
  }

  async findAll(...ids: number[]): Promise<Map<number, PublicAccount>> {
    const map = new Map<number, PublicAccount>()

    const notFound: number[] = []
    for(const id of new Set(ids)) {
      const account = await this.get(id);

      if(account) {
        map.set(id, account);
      } else {
        notFound.push(id)
      }
    }

    if (notFound.length) {
      console.warn(`-> findAll - not found: ${notFound.join(',')}`)
    }

    return map;
  }

}

export const cached = new PublicAccountCache();

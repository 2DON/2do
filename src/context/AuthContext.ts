import { createContext, useMemo, useState } from 'react';
import { TOKEN_EXPIRED_VALUE, TOKEN_HEADER } from '../config';

function isTokenExpired(token: string) {
  const payload = JSON.parse(atob(token.split('.')[1])) as { exp: number };

  return payload.exp * 1000 < Date.now();
}

export function useAuthContext(): AuthContext {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem(TOKEN_HEADER)
  );
  return useMemo(
    () => ({
      authorized:
        !!token && token !== TOKEN_EXPIRED_VALUE && !isTokenExpired(token),
      setToken(newToken: string) {
        sessionStorage.setItem(TOKEN_HEADER, newToken);
        setToken(newToken);
      },
    }),
    [token, setToken]
  );
}

export function auth(): Dict<string> {
  return { [TOKEN_HEADER]: sessionStorage.getItem(TOKEN_HEADER) as string };
}

export default createContext<AuthContext | null>(null);

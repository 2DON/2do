import { createContext, useMemo, useState } from 'react';

export function useAccountContext(): AccountContext {
  const [account, setAccount] = useState<Account | null>(null);
  return useMemo(() => ({ account, setAccount }), [account, setAccount]);
}

export default createContext<AccountContext | null>(null);

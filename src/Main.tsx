import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { SELF_HOSTED } from './config';
import AccountContext, { useAccountContext } from './context/AccountContext';
import AuthContext, { useAuthContext } from './context/AuthContext';
import Routes from './Routes';
import { me } from './services/AccountService';

// TODO: installer icon

const Main: React.FC = () => {
  const authContext = useAuthContext();
  const accountContext = useAccountContext();

  useEffect(() => {
    if (SELF_HOSTED) {
      window.title = '2DO+';
      window.setIcon('icon-golden.png');
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (authContext.authorized && !accountContext.account) {
        accountContext.setAccount(await me());
      }
    })();
  }, [accountContext, authContext.authorized]);

  return (
    <HashRouter>
      <AuthContext.Provider value={authContext}>
        <AccountContext.Provider value={accountContext}>
          <Routes />
        </AccountContext.Provider>
      </AuthContext.Provider>
    </HashRouter>
  );
};

export default Main;

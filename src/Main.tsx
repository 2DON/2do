import React from 'react';
import { HashRouter } from 'react-router-dom';
import AccountContext, { useAccountContext } from './context/AccountContext';
import AuthContext, { useAuthContext } from './context/AuthContext';
import Routes from './Routes';

// TODO: window title, self-hosted icon, installer icon

const Main: React.FC = () => {
  const authContext = useAuthContext();
  const accountContext = useAccountContext();

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

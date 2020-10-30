import React, { useMemo, useState } from 'react';
import AuthContext from './context/AuthContext';
import Routes from './Routes';

// TODO: window title and icon, installer icon

const Main: React.FC = () => {
  // TODO Account
  const authState = useState<any | null>(null);
  const authContext = useMemo(() => authState, [authState]);

  return (
    <AuthContext.Provider value={authContext}>
      <Routes />
    </AuthContext.Provider>
  );
};

export default Main;

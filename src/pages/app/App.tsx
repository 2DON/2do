import React, { useContext } from 'react';
import { FiUser } from 'react-icons/fi';
import AccountContext from '../../context/AccountContext';
import './App.scss';

const App: React.FC = () => {
  const { account } = useContext(AccountContext) as AccountContext;

  return (
    <div className="App">
      <aside className="Sidebar">
        <div className="Tile">
          {account?.avatarUrl ? (
            <img src={account.avatarUrl} alt="" className="icon" />
          ) : (
            <FiUser className="icon" />
          )}
        </div>
      </aside>
      <main>main</main>
    </div>
  );
};

export default App;

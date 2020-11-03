import React, { useContext } from 'react';
import { FiUser } from 'react-icons/fi';
import AccountContext from '../../context/AccountContext';
import './App.scss';

const App: React.FC = () => {
  const { account } = useContext(AccountContext) as AccountContext;

  // const [selected, setSelected] = useState(-1);

  return (
    <div className="App">
      <aside className="Sidebar">
        <div className="Tile">
          {account?.avatarUrl ? (
            <img src={account.avatarUrl} alt="" />
          ) : (
            <FiUser />
          )}
        </div>
        {/* <div
          className={`icon ${selected === -1 ? 'selected' : ''}`}
          onClick={() => setSelected(-1)}
        >
          <img src={account?.avatarUrl || person} alt="ProjectProfile" />
        </div>

        <div className="separator" />

        {/* map(projects) * /}

        <div
          className={`icon ${selected === -2 ? 'selected' : ''}`}
          onClick={() => setSelected(-2)}
        /> */}
      </aside>
      <main>main</main>
    </div>
  );
};

export default App;

import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import AccountContext from '../../context/AccountContext';
import './App.scss';

const App: React.FC = () => {
  const [selectedIndex, selectIndex] = useState(-1);
  const { account } = useContext(AccountContext) as AccountContext;

  return (
    <div className="App">
      <aside className="Sidebar">
        <div
          className={`Tile ${selectedIndex === -1 ? 'selected' : ''}`}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => selectIndex(-1)}
        >
          {account?.avatarUrl ? (
            <img src={account.avatarUrl} alt="" className="icon" />
          ) : (
            <FiUser className="icon" />
          )}
        </div>
        {new Array(12)
          .fill('http://unsplash.it/')
          .map(
            (url) =>
              `${url + Math.round(Math.random() * 30 + 80)}/${Math.round(
                Math.random() * 30 + 80
              )}`
          )
          .map((value, index) => (
            <div
              className={`Tile ${selectedIndex === index ? 'selected' : ''}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`tile-${index}`}
              onDragStart={(e) => e.preventDefault()}
              onClick={() => selectIndex(index)}
            >
              <img className="icon" src={value} alt={value} />
            </div>
          ))}
      </aside>
      <main>main</main>
    </div>
  );
};

export default App;

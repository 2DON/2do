import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import AccountContext from '../../context/AccountContext';
import './App.scss';

const testProjectIcons = new Array(18)
  .fill('http://unsplash.it')
  .map((url) => `${url}/${Math.round(Math.random() * 30 + 80)}`)
  .map((url) => `${url}/${Math.round(Math.random() * 30 + 80)}`)
  .map((url, index) => ({ index, url }));

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
        {testProjectIcons.map(({ index, url }) => (
          <div
            className={`Tile ${selectedIndex === index ? 'selected' : ''}`}
            key={index}
            onDragStart={(e) => e.preventDefault()}
            onClick={() => selectIndex(index)}
          >
            <img className="icon" src={url} alt={`${index}@${url}`} />
          </div>
        ))}
      </aside>
      <main />
    </div>
  );
};

export default App;

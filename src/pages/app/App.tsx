import React, { useContext, useState } from 'react';
import person from '../../assets/person.svg';
import AuthContext from '../../context/AuthContext';
import './App.scss';

const App: React.FC = () => {
  // TODO Account Interface
  const [account]: any = useContext(AuthContext);

  const [selected, setSelected] = useState(-1);

  return (
    <div className="App">
      <aside className="Sidebar">
        <div
          className={`icon ${selected === -1 ? 'selected' : ''}`}
          onClick={() => setSelected(-1)}
        >
          <img src={account?.avatarUrl || person} alt="ProjectProfile" />
        </div>

        <div className="separator" />

        {/* map(projects) */}

        <div
          className={`icon ${selected === -2 ? 'selected' : ''}`}
          onClick={() => setSelected(-2)}
        />
      </aside>
      <main>main</main>
    </div>
  );
};

export default App;

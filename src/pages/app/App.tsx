import React, { useState } from 'react';
import { BsListTask } from 'react-icons/bs';
import { VscPerson } from 'react-icons/vsc';
import { BiTask, BiData } from 'react-icons/bi';
import Sidebar from '../../components/sidebar/Sidebar';
import Dados from './Dados';
import ProjectContext, {
  useProjectContext,
} from '../../context/ProjectContext';
import './App.scss';

const App: React.FC = () => {
  const projectContext = useProjectContext();
  const [selected, setSelected] = useState(0);
  return (
    <div className="App">
      <ProjectContext.Provider value={projectContext}>
        <Sidebar />
        <main className="Project">
          <h3>Projeto Integrador</h3>
          <div id="idDiv">
            <ul>
              <li
                className={`${selected === 0 ? 'selected' : ''}`}
                onClick={() => setSelected(0)}
              >
                <BiData className="icon" /> <p>Meus Dados</p>
              </li>
              <li
                className={`${selected === 1 ? 'selected' : ''}`}
                onClick={() => setSelected(1)}
              >
                <BsListTask className="icon" /> <p>Tarefas</p>
              </li>
              <li
                className={`${selected === 2 ? 'selected' : ''}`}
                onClick={() => setSelected(2)}
              >
                <BiTask className="icon" /> <p>Para mim</p>
              </li>
              <li
                className={`${selected === 3 ? 'selected' : ''}`}
                onClick={() => setSelected(3)}
              >
                <VscPerson className="icon" /> <p>Colaboradores</p>
              </li>
            </ul>
            {selected === 0 ? (
              <Dados />
            ) : selected === 1 ? (
              <div style={{ backgroundColor: 'blue', padding: 100 }} />
            ) : selected === 2 ? (
              <div style={{ backgroundColor: 'green', padding: 100 }} />
            ) : (
                    <div style={{ backgroundColor: 'yellow', padding: 100 }} />
                  )}
          </div>
        </main>
      </ProjectContext.Provider>
    </div>
  );
};

export default App;

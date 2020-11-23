import React, { useState } from 'react';
import { BsListTask } from 'react-icons/bs';
import { VscPerson } from 'react-icons/vsc';
import { BiTask, BiData } from 'react-icons/bi';
import { AiOutlineTeam } from 'react-icons/ai';
import Sidebar from '../../../components/sidebar/Sidebar';
import Dados from '../Dados';
import Tasks from '../Task';
import ProjectContext, {
  useProjectContext,
} from '../../../context/ProjectContext';
import './styles.scss';
import Colaboradores from '../Colaboradores';
import TeamMember from '../TeamMember';

const App: Page = () => {
  const chooseComponent = (selected: number) => {
    if(selected === 0)
      return <Dados />;
    if(selected === 1)
      return <Tasks />;
    if(selected === 2)
      return <div style={{ backgroundColor: 'green', padding: 100 }} />;
    if(selected === 3)
      return <Colaboradores />;
    return <TeamMember />;
    
  }

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
              <li
                className={`${selected === 4 ? 'selected' : ''}`}
                onClick={() => setSelected(4)}
              >
                <AiOutlineTeam className="icon" /> <p>Membros Do Time</p>
              </li>
            </ul>
            {chooseComponent(selected)}
          </div>
        </main>
      </ProjectContext.Provider>
    </div>
  );
};

App.path = "/path"

export default App;

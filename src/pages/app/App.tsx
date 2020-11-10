import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ProjectContext, {
  useProjectContext,
} from '../../context/ProjectContext';
import './App.scss';

const App: React.FC = () => {
  const projectContext = useProjectContext();

  return (
    <div className="App">
      <ProjectContext.Provider value={projectContext}>
        <Sidebar />
        <main>
          <pre>{JSON.stringify(projectContext.project, null, 2)}</pre>
        </main>
      </ProjectContext.Provider>
    </div>
  );
};

export default App;

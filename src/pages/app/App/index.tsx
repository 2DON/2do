import React from 'react';
import Sidebar from '../sidebar';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import Project from '../Project';
import { app_path, project_path } from '../../../pages';
import Home from '../Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      <main>
        <Switch>
          <Route path={app_path} exact component={Home}/>
          <Route path={`${project_path}/:projectId`} component={Project} />
        </Switch>
      </main>
    </div>
  );
};

export default App;

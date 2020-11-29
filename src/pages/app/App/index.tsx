import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import Project from '../Project';
import * as ProjectService from '../../../services/ProjectService'
import { app_path, project_path } from '../../../pages';
import Home from '../Home';
import FullLoadingScreen from '../../../components/FullLoadingScreen';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      new Promise(resolve => setTimeout(resolve, 500)),
      ProjectService.cached.cacheAll(),
    ]).then(() => {
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <FullLoadingScreen />
  }

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

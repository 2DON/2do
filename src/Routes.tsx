import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import AuthContext from './context/AuthContext';
import { app_path, first_steps_path, sign_in_path, sign_up_path, start_path } from './pages';
import App from './pages/app/App';
import CreateProject, { ProjectFirstSteps } from './pages/create-project/CreateProject';
import SignIn from './pages/signin/SignIn';
import FirstSteps from './pages/signup/firststeps/FirstSteps';
import SignUp from './pages/signup/SignUp';
import Start from './pages/start/Start';

const Routes: React.FC = () => {
  const { authorized } = useContext(AuthContext) as AuthContext;

  return (
    <Switch>
      <Route path={start_path} component={Start} />
      <Route path={sign_in_path} component={SignIn} />
      <Route path={sign_up_path} exact component={SignUp} />
      <Route path={first_steps_path} component={FirstSteps} />

      <AuthRoute
        path="/app/create-project"
        exact
        component={<CreateProject />}
      />
      <AuthRoute
        path="/app/create-project/first-steps"
        component={<ProjectFirstSteps />}
      />
      <AuthRoute path={app_path} component={<App/>} />

      <Redirect to={authorized ? app_path : start_path} />
    </Switch>
  );
};

export default Routes;

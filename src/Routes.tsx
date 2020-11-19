import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import AuthContext from './context/AuthContext';
import App from './pages/app/App';
import CreateProject, {
  ProjectFirstSteps,
} from './pages/create-project/CreateProject';
import SignIn from './pages/signin/SignIn';
import FirstSteps from './pages/signup/firststeps/FirstSteps';
import SignUp from './pages/signup/SignUp';
import Start from './pages/start/Start';

const Routes: React.FC = () => {
  const { authorized } = useContext(AuthContext) as AuthContext;

  return (
    <Switch>
      <Route path="/home" component={Start} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />

      <AuthRoute path="/sign-up/first-steps" component={<FirstSteps />} />
      <AuthRoute path="/app" exact component={<App />} />
      <AuthRoute
        path="/app/create-project"
        exact
        component={<CreateProject />}
      />
      <AuthRoute
        path="/app/create-project/first-steps"
        component={<ProjectFirstSteps />}
      />

      <Redirect to={authorized ? '/home' : '/app'} />
    </Switch>
  );
};

export default Routes;

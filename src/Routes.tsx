import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import AuthContext from './context/AuthContext';
import App from './pages/app/App';
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
      <Route path="/sign-up" component={SignUp} />

      <AuthRoute path="/sign-up/first-steps" component={<FirstSteps />} />
      <AuthRoute path="/app" component={<App />} />

      <Redirect to={authorized ? '/home' : '/app'} />
    </Switch>
  );
};

export default Routes;

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
      <Route path={Start.path} component={Start} />
      <Route path={SignIn.path} component={SignIn} />
      <Route path={SignUp.path} exact component={SignUp} />

      <AuthRoute path={FirstSteps.path} component={<FirstSteps />} />
      <AuthRoute path={App.path} component={
        <Switch>
          <Route path={App.path} component={App} />
        </Switch>
      } />

      <Redirect to={authorized ? App.path : Start.path} />
    </Switch>
  );
};

export default Routes;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AuthRoute: React.FC<AuthRouteProps> = ({ path, component }) => (
  <AuthContext.Consumer>
    {(context) => (
      <Route
        path={path}
        render={({ location }) =>
          context?.authorized ? (
            component
          ) : (
            <Redirect
              to={{
                pathname: '/home',
                state: { from: location },
              }}
            />
          )
        }
      />
    )}
  </AuthContext.Consumer>
);

interface AuthRouteProps {
  path: string;
  component: React.ReactNode | React.FunctionComponent;
}

export default AuthRoute;

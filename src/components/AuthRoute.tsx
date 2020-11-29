import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { start_path } from '../pages';

const AuthRoute: React.FC<AuthRouteProps> = ({
  path,
  component,
  exact = false,
}) => (
  <AuthContext.Consumer>
    {(context) => (
      <Route
        path={path}
        exact={exact}
        render={({ location }) =>
          context?.authorized ? (
            component
          ) : (
            <Redirect
              to={{
                pathname: start_path,
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
  component: React.ReactNode | React.FC;
  exact?: boolean;
}

export default AuthRoute;

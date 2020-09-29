import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/signup/SignUp'
import Start from './pages/start/Start'
import { useAccountInfo } from './services/AuthService'

function Routes() {
  const [authorized, accountInfo] = useAccountInfo()

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/app" authorized={authorized}>
          <pre>{JSON.stringify(accountInfo, undefined, 2)}</pre>
        </ProtectedRoute>

        <Route path="/home">
          <Start />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Redirect to={authorized ? '/home' : '/app'} />
      </Switch>
    </Router>
  )
}

function ProtectedRoute({ children, authorized, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorized ? (
          children
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
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  authorized: PropTypes.bool,
}

export default Routes

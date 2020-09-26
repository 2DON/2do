import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/signup/SignUp'
import Start from './pages/start/Start'
import { useAuth } from './services/AuthService'

function Routes() {
  const [authorized] = useAuth()

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/app" authorized={authorized}>
          <h1>Authorized!</h1>
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

import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import App from './pages/app/App'
import SignIn from './pages/signin/SignIn'
import FirstSteps from './pages/signup/firststeps/FirstSteps'
import SignUp from './pages/signup/SignUp'
import Start from './pages/start/Start'

// TODO one protected route with all other routes inside

function Routes() {
  const [account] = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/app" authorized={!!account}>
          <App />
        </ProtectedRoute>

        <Route path="/home">
          <Start />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <ProtectedRoute path="/sign-up/first-steps" authorized={!!account}>
          <FirstSteps />
        </ProtectedRoute>
        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Redirect to={account ? '/home' : '/app'} />
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

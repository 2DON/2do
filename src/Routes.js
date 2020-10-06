import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import person from './assets/person.svg'
import SignIn from './pages/signin/SignIn'
import FirstSteps from './pages/signup/firststeps/FirstSteps'
import SignUp from './pages/signup/SignUp'
import Start from './pages/start/Start'
import { useAccountInfo } from './services/AuthService'

function Routes() {
  const [authorized, accountInfo] = useAccountInfo()

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/app" authorized={authorized}>
          <img
            width="30%"
            style={{ marginRight: '30px' }}
            src={accountInfo?.avatarUrl || person}
            alt=""
          />
          <pre>
            {JSON.stringify(
              { ...accountInfo, avatarUrl: undefined },
              undefined,
              2,
            )}
          </pre>
        </ProtectedRoute>

        <Route path="/home">
          <Start />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <ProtectedRoute path="/sign-up/first-steps" authorized={authorized}>
          <FirstSteps />
        </ProtectedRoute>
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

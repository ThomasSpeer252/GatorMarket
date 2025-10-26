import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import PreLogin from './pages/prelogin'
import Login from './pages/login'
import SignUp from './pages/signup'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={PreLogin} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={SignUp} exact path="/signup" />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

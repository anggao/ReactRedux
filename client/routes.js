import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'

import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Greetings} />
    <Route path="signup" components={SignupPage} />
    <Route path="login" components={LoginPage} />
  </Route>
)

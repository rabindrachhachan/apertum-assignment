import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './onboarding/pages/login';
import User from './onboarding/pages/user';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Redirect to="/login" />}
          />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/user" exact={true} component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;

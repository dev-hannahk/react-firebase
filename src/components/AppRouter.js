import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route path='/' component={Home}></Route>
        ) : (
          <Route path='/' component={Auth}></Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;

import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Navigation from 'components/Navigation.js';
import Home from '../routes/Home';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path='/' component={Home}></Route>
            <Route path='/profile' component={Profile}></Route>
            <Redirect from='*' to='/' />
          </>
        ) : (
          <>
            <Route path='/' component={Auth}></Route>
            <Redirect from='*' to='/' />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;

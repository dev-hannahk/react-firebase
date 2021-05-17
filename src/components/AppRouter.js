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

function AppRouter({ refreshUser, isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
            <Redirect from='*' to='/' />
          </>
        ) : (
          <>
            <Route path='/' component={Auth} />
            <Redirect from='*' to='/' />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;

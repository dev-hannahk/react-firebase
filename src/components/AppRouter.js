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

function AppRouter({ isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route path='/profile' component={Profile} />
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

import React, { useState, useEffect } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'firebaseInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      {/* <footer>&copy;{new Date().getFullYear()} Hannah's Guestbook</footer> */}
    </>
  );
}

export default App;

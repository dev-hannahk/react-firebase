import React, { useState } from 'react';
import AppRouter from '../components/AppRouter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy;{new Date().getFullYear()} Hwitter</footer>
    </>
  );
}

export default App;
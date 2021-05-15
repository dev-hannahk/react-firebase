import { authService } from 'firebaseInstance';
import React from 'react';

function Profile() {
  const onLogOutClick = () => {
    authService.signOut();
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;

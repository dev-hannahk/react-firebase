import { authService, dbService } from 'firebaseInstance';
import React, { useEffect, useState } from 'react';

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState('');
  const onLogOutClick = () => {
    authService.signOut();
    refreshUser();
  };

  const getMyMessages = async () => {
    await dbService
      .collection('messages')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
  };

  useEffect(() => {
    getMyMessages();
    return () => getMyMessages;
  }, []);

  const onNameChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const onNameSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onNameSubmit}>
        <input
          type='text'
          value={newDisplayName}
          placeholder='Display Name'
          onChange={onNameChange}
        />
        <input type='submit' value='Update Name' />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;

import React, { useState } from 'react';
import { authService } from 'firebaseInstance';
import { firebaseInstance } from 'firebaseInstance';
import AuthForm from 'components/AuthForm';

function Auth() {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;

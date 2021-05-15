import { authService } from 'firebaseInstance';
import React, { useState } from 'react';
import { firebaseInstance } from 'firebaseInstance';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSumbit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <div>
        <form onSubmit={onSumbit}>
          <input
            name='email'
            value={email}
            type='text'
            placeholder='Email'
            onChange={onChange}
          />
          <input
            name='password'
            value={password}
            type='password'
            placeholder='Password'
            onChange={onChange}
          />
          <input
            type='submit'
            value={newAccount ? 'Create Account' : 'Log In'}
          />
        </form>
        {error}
      </div>
      <span onClick={toggleAccount}>
        {newAccount ? 'Login' : 'Create Account'}
      </span>
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

import React, { useState } from 'react';
import { authService } from 'firebaseInstance';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
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

  return (
    <>
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
    </>
  );
}

export default AuthForm;

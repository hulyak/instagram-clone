import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import logo from '../images/logo.png';
import FirebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid =
    userName === '' || fullName === '' || password === '' || email === '';

  useEffect(() => {
    document.title = 'SignUp - Instagram';
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userNameExists = await doesUsernameExist(userName);
    if (!userNameExists.length) {
      // create a new user
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: userName,
        });
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          userName: userName.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (e) {
        setFullName('');
        setError(e.message);
      }
    } else {
      setFullName('');
      setEmail('');
      setUserName('');
      setEmail('');
      setError('That user name is already taken, please try another');
    }
  };

  return (
    <div className='container flex mx-auto max-w-xs items-center h-screen'>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center bg-white p-4 border mb-4'>
          <h1 className='flex justify-center w-full'>
            <img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
          </h1>

          {error && (
            <p className='mb-4 text-xs text-red-500 text-center'>{error}</p>
          )}
          <form method='POST' onSubmit={handleSignUp}>
            <input
              aria-label='Enter your username'
              className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
              type='text'
              placeholder='Username'
              onChange={({ target }) => setUserName(target.value.toLowerCase())}
              value={userName}
            />
            <input
              aria-label='Full name'
              className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
              type='text'
              placeholder='Full name'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label='Enter your email address'
              className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
              type='text'
              placeholder='Email address'
              onChange={({ target }) => setEmail(target.value.toLowerCase())}
              value={email}
            />
            <input
              aria-label='Enter your password'
              className='text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2'
              type='password'
              placeholder='Password'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {' '}
              Sign Up
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
          <p className='text-sm'>
            Have an account?{' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

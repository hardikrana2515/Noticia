
import React, { useContext } from 'react';
import userContext from '../context/UserContext/userContext';
import Login from './Login';
import SignUp from './Signup';

const Auth = () => {
  const { loginMode } = useContext(userContext);

  return loginMode ? <Login /> : <SignUp />;
};

export default Auth;

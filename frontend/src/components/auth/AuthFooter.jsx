import React from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { startLoading, endLoading, setAuth } from 'state/app';

import 'react-spotify-auth/dist/index.css';

const AuthFooter = () => {
  const loading = useSelector((state) => state.app.loading);
  const auth = useSelector((state) => state.app.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(startLoading());
    switch (auth) {
      case 'spotify':
        Cookies.remove('spotifyAuthToken');
        break;
      default:
    }
    dispatch(setAuth('logged out'));
    navigate('/');
    dispatch(endLoading());
  };

  if (!Cookies.get('spotifyAuthToken')) dispatch(setAuth(null));

  return (
    <>
      <div className="flex-col justify-center items-center w-56 text-center">
        <p className="text-inverse">authorized with {auth}</p>
        <button className="text-green-500 border-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-110 p-1 mt-2" type="submit" onClick={logout}>logout</button>
      </div>
    </>
  );
};

export default AuthFooter;

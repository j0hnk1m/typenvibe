import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spotify from './Spotify';
import Cookies from 'js-cookie';
import { setAuth } from 'state/app';

import 'react-spotify-auth/dist/index.css';

const Auth = () => {
  const auth = useSelector((state) => state.app.auth);
  const [tokenName, setTokenName] = useState();
  const dispatch = useDispatch();

  const deleteToken = () => {
    dispatch(setAuth(null));
    Cookies.remove(tokenName, { path: '' });
    console.log(`removed ${tokenName}`);
    console.log(Cookies.get(tokenName))
  };

  useEffect(() => {
    switch (auth) {
      case 'spotify':
        setTokenName('spotifyAuthToken');
        break;
      default:
    }
  }, [auth]);

  return (
    <>
      {auth
        ? (
          <>
            <div className="flex-col justify-center items-center w-40 text-center">
              <p className="text-inverse">using {auth}</p>
              <button className="text-inverse" type="submit" onClick={deleteToken}>logout</button>
            </div>
          </>
        ) : (
          <>
            <Spotify />
          </>
        )}
    </>
  );
};

export default Auth;

import React from 'react';
import Spotify from './Spotify';
import { setAuth } from 'state/app';

import 'react-spotify-auth/dist/index.css';

const AuthPage = () => (
  <>
    <Spotify />
  </>
);

export default AuthPage;

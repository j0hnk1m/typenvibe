import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpotifyAuth } from 'react-spotify-auth';
import { setAuth } from 'state/app';

const Spotify = () => {
  const auth = useSelector((state) => state.app.auth);
  const dispatch = useDispatch();
  const handleToken = () => dispatch(setAuth('spotify'));
  const webPlaybackToken = 'BQC2JykMfT_WJDgk5LALTc5j30Rd0d4KhtKL_8ZhC2CL-RXGNCtPvivYasQtVfnp5bINNDOEiTDvQbU6_rdmRWOSVWOi3rBM8sIrk1cbVBCthIzh88xENymM_w7L9KFg-wFC_lqrEX2jcLb2AYkCY6fmbhSBaq2qlyAKYcw';

  // TODO: using cookies allows for 2 hr expiry, but can't delete cookie since it's filled up instantaneously
  return (
    <>
      <SpotifyAuth
        redirectUri={process.env.SPOTIFY_REDIRECT_URI}
        clientID={process.env.SPOTIFY_CLIENT_ID}
        scopes={['user-read-private', 'user-read-email', 'streaming']}
        onAccessToken={handleToken}
        title="login"
      />
    </>
  );
};

export default Spotify;

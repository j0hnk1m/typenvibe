import React from 'react';
import { useDispatch } from 'react-redux';
import { SpotifyAuth } from 'react-spotify-auth';
import { setAuth } from 'state/app';

const Spotify = () => {
  const dispatch = useDispatch();
  const handleToken = () => dispatch(setAuth('spotify'));
  const webPlaybackToken = 'BQC2JykMfT_WJDgk5LALTc5j30Rd0d4KhtKL_8ZhC2CL-RXGNCtPvivYasQtVfnp5bINNDOEiTDvQbU6_rdmRWOSVWOi3rBM8sIrk1cbVBCthIzh88xENymM_w7L9KFg-wFC_lqrEX2jcLb2AYkCY6fmbhSBaq2qlyAKYcw';

  const CLIENT_ID = '84f2cf566f484061b80fa5795146f2c3';
  const REDIRECT_URI = typeof window !== 'undefined' ? window.location.href : '';

  // TODO: using cookies allows for 2 hr expiry, but can't delete cookie since it's filled up instantaneously
  return (
    <>
      <SpotifyAuth
        redirectUri={REDIRECT_URI}
        clientID={CLIENT_ID}
        scopes={[
          'user-read-private',
          'user-read-email',
          'streaming',
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-library-read',
          'user-library-modify',
        ]}
        onAccessToken={handleToken}
        title="login"
      />
    </>
  );
};

export default Spotify;

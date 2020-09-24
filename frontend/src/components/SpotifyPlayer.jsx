import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SpotifyAuth, Scopes } from 'react-spotify-auth'

const SpotifyPlayer = () => {
  // Global song state
  const curSong = useSelector((state) => state.app.curSong);
  const webPlaybackToken = 'BQC2JykMfT_WJDgk5LALTc5j30Rd0d4KhtKL_8ZhC2CL-RXGNCtPvivYasQtVfnp5bINNDOEiTDvQbU6_rdmRWOSVWOi3rBM8sIrk1cbVBCthIzh88xENymM_w7L9KFg-wFC_lqrEX2jcLb2AYkCY6fmbhSBaq2qlyAKYcw';
  const [userToken, setUserToken] = useState(localStorage.getItem('spotifyAuthToken'));
  console.log(userToken);

  return (
    <>
    <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <SpotifyAuth
        redirectUri='http://localhost:8000'
        clientID={process.env.SPOTIFY_CLIENT_ID}
        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.streaming]} // either style will work
        localStorage
      />
      <div className="container flex justify-center items-center w-8/12 max-w-screen-lg h-20 p-5">
        <p>auth</p>
      </div>
    </>
  );
};

export default SpotifyPlayer;

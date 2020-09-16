import React from 'react';

const Auth = () => {
  const token = localStorage.getItem('spotifyAuthToken');

  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const redirectUri = "http://localhost:8000";
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  return (
    <>
      {token
        ? (
          <>
            <p onClick={() => localStorage.removeItem('spotifyAuthToken')}>log out</p>
          </>
        ) : (
          <>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=code&show_dialog=true`}
            >
              login to Spotify
            </a>
          </>
        )}
    </>
  );
};

export default Auth;

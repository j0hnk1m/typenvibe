import React from 'react';

const Auth = () => {
  const token = localStorage.getItem('spotifyAuthToken');

  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const redirectUri = "https://google.com";
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  return (
    <>
      <div className="container flex justify-center items-center w-8/12 max-w-screen-lg h-20 p-5">
        {token
          ? (
            <>
              <p onClick={() => localStorage.removeItem('spotifyAuthToken')}>
                log out
              </p>
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
      </div>
    </>
  );
};

export default Auth;

import React from 'react';

const Auth = () => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const redirectUri = "https://google.com";
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  return (
    <>
      <div className="container flex justify-center items-center w-8/12 max-w-screen-lg h-20 p-5">
        <p>auth</p>
      </div>
    </>
  );
};

export default Auth;

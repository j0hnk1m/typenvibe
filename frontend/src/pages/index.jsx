import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpotifyApiContext } from 'react-spotify-api';
import Layout from 'components/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import Auth from 'components/Auth';
import { getSongs } from 'state/app';

import 'styles/style.css';

const Home = () => {
  const curSong = useSelector((state) => state.app.curSong);
  const lrc = useSelector((state) => state.app.lrc);
  const dispatch = useDispatch();
  dispatch(getSongs());

  const token = localStorage.getItem('spotifyAuthToken');

  return (
    <Layout>
      <SpotifyApiContext.Provider value={token}>
        <div className="container">
          <div className="alignBoom">
            <Boombox />
            {
              (curSong && lrc && lrc.length !== 0)
                && <Typing />
            }
          </div>

          <div className="auth">
            <Auth />
          </div>
        </div>
      </SpotifyApiContext.Provider>
    </Layout>
  );
};

export default Home;

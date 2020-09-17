import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout/Layout';
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
      {
        curSong && lrc && lrc.length !== 0
          ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex col-span-1 h-20 items-center justify-center">
                  <Boombox />
                </div>
                <Typing />
              </div>
              {/* <Auth /> */}
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <Boombox />
              </div>
            </>
          )
      }
    </Layout>
  );
};

export default Home;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import Spinner from 'components/Spinner';
import { getSongs } from 'state/app';

const Home = () => {
  const curSong = useSelector((state) => state.app.curSong);
  const lrc = useSelector((state) => state.app.lrc);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();
  dispatch(getSongs());

  const songPicked = curSong !== null && lrc && lrc.length !== 0;

  return (
    <>
      <Layout>
        {songPicked
          ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex col-span-1 h-20 items-center justify-center">
                  <Boombox />
                </div>
                <Typing />
                {loading
                && (
                  <Spinner />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex w-3/5 mx-auto">
                <Boombox />
                {loading
                && (
                  <Spinner />
                )}
              </div>
            </>
          )}
      </Layout>
    </>
  );
};

export default Home;

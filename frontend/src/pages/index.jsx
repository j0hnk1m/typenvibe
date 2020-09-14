import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import { getSongs } from 'state/app';

import 'styles/style.css';

const Home = () => {
  const curSong = useSelector((state) => state.app.curSong);
  const lrc = useSelector((state) => state.app.lrc);
  const dispatch = useDispatch();
  dispatch(getSongs());

  return (
    <>
      <Layout>
        <Boombox />
        {
          (curSong && lrc && lrc.length !== 0)
            && <Typing />
        }
      </Layout>
    </>
  );
};

export default Home;

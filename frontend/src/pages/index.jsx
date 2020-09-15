import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import { getSongs } from 'state/app';

import 'styles/style1.css';

const Home = () => {
  const curSong = useSelector((state) => state.app.curSong);
  const lrc = useSelector((state) => state.app.lrc);
  const dispatch = useDispatch();
  dispatch(getSongs());

  return (
    <div className="container">
      <Layout>
        <Boombox />
        {
          (curSong && lrc && lrc.length !== 0)
            && <Typing />
        }
      </Layout>
    </div>
  );
};

export default Home;

import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'components/Layout';
import Boombox from 'components/Boombox';
import Typing from 'components/Typing';
import { getSongs } from 'state/app';

import 'styles/style.css';

const Home = () => {
  const dispatch = useDispatch();
  dispatch(getSongs());

  return (
    <>
      <Layout>
        <Boombox />
        <Typing />
      </Layout>
    </>
  );
};

export default Home;

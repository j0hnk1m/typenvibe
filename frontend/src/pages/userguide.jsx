import React from 'react';
import { navigate } from 'gatsby';
import Layout from 'components/Layout';

const UserGuide = () => {
  const navigateHome = () => navigate('/');

  return (
    <>
      <Layout>
        <p onClick={navigateHome}>back</p>
        <h1>user guide</h1>
      </Layout>
    </>
  );
};

export default UserGuide;

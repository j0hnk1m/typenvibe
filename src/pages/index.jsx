import React, { useState, useEffect } from 'react';
import {useStaticQuery, graphql } from 'gatsby';
import Layout from 'components/Layout';
import Head from 'components/Head';
import Typing from 'components/Typing';
import useAudio from 'components/Typing';
import Boombox from 'components/Boombox';
import Ui from 'components/Ui';
import UserGuide from 'components/UserGuide';

import 'assets/css/style.css';

const Content = ({ page, setPage, setSong }) => {
  if (page === 0) {
    return (
      <>
        <Boombox setSong={setSong} />
        <Typing lyrics={test} togglePlayback={togglePlayback} />
      </>
    );
  }
  if (page === 1) return <UserGuide setPage={setPage} />;
  return <Ui setPage={setPage} />;
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');

  let togglePlayback;
  const test = "I'm at a payphone trying to call home";

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "data" } }) {
        edges {
          node {
            extension
            dir
            modifiedTime
          }
        }
      }
    }
  `);

  // console.log(data);

  useEffect(() => {
    if (song !== '') {
      const [playing, toggle] = useAudio(song);
      console.log(togglePlayback);
      togglePlayback = toggle;
      console.log(togglePlayback);
      // toggle();
    }
  }, [song]);

  const Content = () => {
    if (page === 0) {
      return (
        <>
          <Boombox setSong={setSong} />
          <Typing lyrics={test} togglePlayback={togglePlayback} />
        </>
      );
    }
    if (page === 1) return <UserGuide setPage={setPage} />;
    return <Ui setPage={setPage} />;
  };

  return (
    <>
      <Layout setPage={setPage}>
        <Content />
      </Layout>
    </>
  );
};

export default Home;

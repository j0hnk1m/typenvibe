import React, { useState } from 'react';
import Layout from 'components/Layout';
import Head from 'components/Head';
import Typing from 'components/Typing';
import Ui from 'components/Ui';
import UserGuide from 'components/UserGuide';
import 'assets/css/style.css';

const Home = () => {
  const [page, setPage] = useState(0);
  const test = "I'm at a payphone trying to call home";

  let content;
  if (page === 0) content = <Typing lyrics={test} />;
  else if (page === 1) content = <UserGuide setPage={setPage} />;
  else if (page === 2) content = <Ui setPage={setPage} />;

  return (
    <>
      <Layout setPage={setPage}>
        {content}
      </Layout>
    </>
  );
};

export default Home;

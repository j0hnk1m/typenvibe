import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'components/Layout';
import Typing from 'components/Typing';
import Ui from 'components/Ui';
import UserGuide from 'components/UserGuide';

import 'styles/style.css';

const Home = () => {
  const [page, setPage] = useState(0);

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

  const Content = () => {
    if (page === 0) return <Typing />;
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

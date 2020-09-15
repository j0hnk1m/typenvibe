import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Footer from './Footer';

const Layout = ({ title, children }) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <h2 className="header">
        {query.site.siteMetadata.title}
      </h2>

      {children}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Footer title={title} />
      </div>
    </>
  );
};

export default Layout;

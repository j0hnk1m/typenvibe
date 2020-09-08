import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Layout = ({ setPage, children }) => {
  const data = useStaticQuery(graphql`
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
      <h2 className="header">{data.site.siteMetadata.title}</h2>

      {children}

      <div className="footer">
        <p className="button" onClick={() => setPage(1)} tabIndex="4">
          user guide
        </p>
        <p className="button" onClick={() => setPage(2)} tabIndex="4">
          ui
        </p>
      </div>
    </>
  );
};

export default Layout;

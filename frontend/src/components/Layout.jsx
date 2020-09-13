import React from 'react';
import { navigate } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

const Layout = ({ children }) => {
  const navigateUserGuide = () => navigate('/userguide');
  const navigateSettings = () => navigate('/settings');

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
      <h2 className="header">{query.site.siteMetadata.title}</h2>

      {children}

      <div className="footer">
        <p className="button" onClick={navigateUserGuide} tabIndex="4">
          user guide
        </p>
        <p className="button" onClick={navigateSettings} tabIndex="4">
          settings
        </p>
      </div>
    </>
  );
};

export default Layout;

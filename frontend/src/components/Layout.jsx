import React from 'react';
import { navigate } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

const Layout = ({ children }) => {
  const navigateUserGuide = () => navigate('/userguide');
  const navigateSettings = () => navigate('/settings');

  // VERY VERY BAD
  const curURL = 'http://localhost:8000/';
  const ext = window.location.href.replaceAll(curURL, ''); 
  console.log(ext);
  let userButton;
  if (ext !== 'userguide') {
    userButton = <p className="button" onClick={navigateUserGuide} tabIndex="4"> user guide </p>
  }
  let settingsButton;
  if (ext !== 'settings') {
    settingsButton = <p className="button" onClick={navigateSettings} tabIndex="4"> settings </p>
  }

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
        {userButton}{settingsButton}
      </div>
    </>
  );
};

export default Layout;

import React from 'react';
import { navigate } from 'gatsby';

const Footer = ({ title }) => {
  const navigateUserGuide = () => navigate('/userguide');
  const navigateSettings = () => navigate('/settings');
  const userguideButton = (
    <p className="footer-button" onClick={navigateUserGuide} tabIndex="4">
      user guide
    </p>
  );
  const settingsButton = (
    <p className="footer-button" onClick={navigateSettings} tabIndex="4">
      settings
    </p>
  );

  switch (title) {
    case 'settings':
      return userguideButton;
    case 'user guide':
      return settingsButton;
    default:
      return (
        <>
          {userguideButton}
          {' / '}
          {settingsButton}
        </>
      );
  }
};

export default Footer;

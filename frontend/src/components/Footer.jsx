import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <>
    <Link
      className="footer-button"
      to="/about"
      activeStyle={{ textDecoration: 'underline' }}
    >
      about
    </Link>
    <p className="inline">|</p>
    <Link
      className="footer-button"
      to="/settings"
      activeStyle={{ textDecoration: 'underline' }}
    >
      settings
    </Link>
  </>
);

export default Footer;

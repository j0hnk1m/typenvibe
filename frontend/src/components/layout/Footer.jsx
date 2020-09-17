import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <>
    <footer className="flex relative h-20 justify-center items-center text-lg">
      <Link
        className="m-0"
        to="/about"
        activeStyle={{ textDecoration: 'underline' }}
      >
        about
      </Link>
      <p>|</p>
      <Link
        className="m-0"
        to="/settings"
        activeStyle={{ textDecoration: 'underline' }}
      >
        settings
      </Link>
    </footer>
  </>
);

export default Footer;

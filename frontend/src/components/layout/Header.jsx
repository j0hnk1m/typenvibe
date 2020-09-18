import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Header = () => {
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
      <header className="flex relative h-20 justify-center items-center">
        <Link to="/">
          <span className="font-bold text-2xl text-primary">
            {query.site.siteMetadata.title}
          </span>
        </Link>
      </header>
    </>
  );
};

export default Header;

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
        <span className="font-bold text-2xl">
          <Link to="/">
            {query.site.siteMetadata.title}
          </Link>
        </span>
      </header>
    </>
  );
};

export default Header;

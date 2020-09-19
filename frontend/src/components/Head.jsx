import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from 'static/favicon.ico';

const Head = ({ title }) => {
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
      <Helmet>
        <html lang="en" />
        {
          title === undefined
            ? <title>{query.site.siteMetadata.title}</title>
            : <title>{`${query.site.siteMetadata.title} | ${query.site.siteMetadata.title}`}</title>
        }
        <description>{query.site.siteMetadata.description}</description>
        <link rel="icon" href={favicon} />
      </Helmet>
    </>
  );
};

export default Head;

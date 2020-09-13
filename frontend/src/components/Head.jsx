import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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
      {
        title === undefined
          ? <Helmet title={`${query.site.siteMetadata.title}`} />
          : <Helmet title={`${title} | ${query.site.siteMetadata.title}`} />
      }
    </>
  );
};

export default Head;

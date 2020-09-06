import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ title }) => {
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
      {
        title === undefined
          ? <Helmet title={`${data.site.siteMetadata.title}`} />
          : <Helmet title={`${title} | ${data.site.siteMetadata.title}`} />
      }
    </>
  );
};

export default Head;

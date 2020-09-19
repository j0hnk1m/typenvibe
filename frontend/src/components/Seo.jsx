import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from 'static/favicon.ico';

const SEO = ({ title }) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `);

  return (
    <Helmet defer={false}>
      <html lang="en" />
      <meta charSet="utf-8" name="description" content={query.site.siteMetadata.description} />
      {
        title === undefined
          ? <title>{query.site.siteMetadata.title}</title>
          : <title>{`${title} | ${query.site.siteMetadata.title}`}</title>
      }
      <link rel="icon" href={favicon} />
    </Helmet>
  );
};

export default SEO;

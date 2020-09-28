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
          keywords
        }
      }
    }
  `);

  return (
    <Helmet defer={false}>
      <html lang="en" />
      <meta name="charSet" content="utf-8" />
      <meta name="description" content={query.site.siteMetadata.description} />
      <meta name="keywords" content={query.site.siteMetadata.keywords.join(', ')} />
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

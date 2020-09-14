/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'typenvibe',
    description: 'Just type and vibe bruv',
    siteUrl: 'https://typenvibe.netlify.app',
  },
  plugins: [
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          components: 'src/components',
          pages: 'src/pages',
          styles: 'src/styles',
          state: 'src/state',
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/markdown`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: `${process.env.ACCESS_KEY_ID}`,
          secretAccessKey: `${process.env.ACCESS_SECRET}`,
        },
        buckets: [`${process.env.S3_BUCKET}`],
      },
    },
    'gatsby-plugin-netlify',
  ],
};

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
    description: 'a web app to practice typing in rythm with your favorite songs',
    siteUrl: 'https://typenvibe.com',
    author: 'John Kim, Rishi Gundakaram',
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
          static: 'static',
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'typenvibe',
        display: 'standalone',
      },
    },
    'gatsby-plugin-sitemap',
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'UA-178440772-1',
    //   },
    // },
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-postcss',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: process.env.S3_BUCKET,
        acl: null,
        protocol: 'https',
        hostname: 'typenvibe.com',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-purgecss',
    //   options: {
    //     printRejected: true,
    //     tailwind: true,
    //     // develop: true,
    //     ignore: ['rc-slider/', 'styles/themes/'],
    //     whitelist: [],
    //     whitelistPatterns: [],
    //   },
    // },
  ],
};

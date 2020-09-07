/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
          assets: 'src/assets',
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/assets/data/`,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};

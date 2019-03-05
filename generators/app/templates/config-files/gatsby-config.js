module.exports = {
  siteMetadata: {
    url: '<%= websiteURL %>',
    title: `<%= websiteFullName %>`,
    description: `<%= websiteDescription %>`,
    keywords: `<%= websiteKeywords %>`,
    lang: `<%= language %>`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `<%= websiteFullName %>`,
        short_name: `<%= projectName %>`,
        start_url: `/`,
        background_color: `<%= manifestColor %>`,
        theme_color: `<%= manifestColor %>`,
        display: `minimal-ui`,
        icon: `static/images/favicon/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}

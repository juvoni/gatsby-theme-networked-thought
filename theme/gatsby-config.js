module.exports = {
  plugins: [
    `gatsby-plugin-theme-ui`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/templates/page.tsx"),
        },
      },
    },
  ],
};

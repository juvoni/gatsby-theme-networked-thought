module.exports = ({ actions, reporter }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Thought implements Node @infer {
      title: String!
      slug: String!
      aliases: [String]
      absolutePath: String!
      birthtime: Date! @dateformat
      mtime: Date! @dateformat
      outboundReferenceSlugs: [String!]
      inboundReferenceSlugs: [String!]
    }
  `;

  reporter.info("Digital Garden: setting up schema");
  createTypes(typeDefs);
};

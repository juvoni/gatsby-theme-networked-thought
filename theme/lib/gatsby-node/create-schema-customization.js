const createSchemaCustomization = ({ actions, reporter }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Thought implements Node @infer {
      title: String!
      slug: String!
      aliases: [String]
      absolutePath: String!
      birthtime: Date! @dateformat
      mtime: Date! @dateformat
      outboundReferences: [ThoughtReference!]
      inboundReferences: [ThoughtReference!]
    }

    type ThoughtReference @infer {
      slug: String!
      previewMarkdown: String!
      previewHtml: String!
      thought: Thought! @link(from: "thoughtId")
    }
  `;

  reporter.info('Networked Thought: setting up schema...');
  createTypes(typeDefs);
};

module.exports = createSchemaCustomization;

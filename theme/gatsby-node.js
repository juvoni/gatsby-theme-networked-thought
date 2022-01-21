const fs = require('fs');
const createPages = require('./lib/gatsby-node/create-pages');
const createSchemaCustomization = require('./lib/gatsby-node/create-schema-customization');
const pluginOptionsSchema = require('./lib/gatsby-node/plugin-options-schema');
const sourceNodes = require('./lib/gatsby-node/source-nodes');

function onPreBootstrap({ reporter }, themeOptions) {
  const thoughtsDirectory = themeOptions.thoughtsDirectory || 'content/thoughts/';
  if (!fs.existsSync(thoughtsDirectory)) {
    reporter.info(`Creating notes directory: ${thoughtsDirectory}`);
    fs.mkdirSync(thoughtsDirectory, { recursive: true });
  }
}

module.exports = {
  createSchemaCustomization,
  pluginOptionsSchema,
  sourceNodes,
  createPages,
  onPreBootstrap,
};

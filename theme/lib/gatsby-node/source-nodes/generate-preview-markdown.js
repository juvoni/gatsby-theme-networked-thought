// const { unstable_renderSubtreeIntoContainer } = require('react-dom');
const html = require('rehype-stringify');
const gfm = require('remark-gfm');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const stringifyMd = require('remark-stringify');
const unified = require('unified');

function findDeepestChildForPosition(parent, tree, position) {
  if (!tree.children || tree.children.length == 0) {
    return {
      parent: parent,
      child: tree,
    };
  }

  for (const child of tree.children) {
    const childPosition = child.position;
    if (childPosition) {
      const { start, end } = childPosition;
      if (start.offset && start.offset <= position && end.offset && end.offset >= position) {
        return findDeepestChildForPosition(
          {
            parent: parent,
            node: tree,
          },
          child,
          position,
        );
      }
    }
  }
  return {
    parent: parent,
    child: tree,
  };
}

function textNoEscaping() {
  const Compiler = this.Compiler;
  const visitors = Compiler.prototype.visitors;

  function f(node, _parent) {
    return this.encode(node, node).value;
  }

  visitors.text = f;
}

function generatePreviewMarkdown(tree, position) {
  let { parent } = findDeepestChildForPosition(null, tree, position);

  if (parent) {
    // Adding this logic to avoid including too large an amount of content. May need additional heuristics to improve this
    // Right now it essentially will just capture the bullet point or paragraph where it is mentioned.
    const maxDepth = 2;
    for (let i = 0; i < maxDepth && parent.parent != null && parent.parent.node.type !== 'root'; i++) {
      parent = parent.parent;
    }
  }

  const processor = unified().use(stringifyMd, { commonmark: true }).use(textNoEscaping).freeze();
  return processor.stringify(parent ? parent.node : tree);
}

function generatePreviewHtml(markdownText) {
  const previewHtml = unified()
    .use(markdown)
    .use(gfm)
    .use(remark2rehype)
    .use(html)
    .processSync(markdownText)
    .toString();

  return previewHtml;
}

module.exports = {
  generatePreviewMarkdown,
  generatePreviewHtml,
}

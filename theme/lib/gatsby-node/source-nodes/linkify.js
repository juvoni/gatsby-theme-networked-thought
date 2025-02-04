function processRegExps(
  regexpInclusive,
  regexpExclusive,
  content,
  nameToSlugMap,
  pluginOptions,
) {
  const matches = content.match(regexpInclusive);
  if (matches === null) {
    return content;
  }

  const { rootPath } = pluginOptions;
  let newContent = content;
  matches
    .filter((a, b) => matches.indexOf(a) === b)
    .forEach((match) => {
      const textMatch = match.match(regexpExclusive);
      if (textMatch === null) {
        return;
      }

      const text = textMatch[0];
      const name = text.toLowerCase();
      if (nameToSlugMap.has(name)) {
        const link = nameToSlugMap.get(name);
        const linkPath = `${rootPath}/${link}`.replace('//', '/');
        const linkified = `[${text}](${linkPath})`;
        newContent = newContent.split(match).join(linkified);
      }
    });

  return newContent;
}

module.exports = function linkify(
  content,
  nameToSlugMap,
  pluginOptions,
) {
  // Find matches for content between double brackets
  // e.g. [[Example]] -> Example
  const bracketRegexExclusive = /(?<=\[\[).*?(?=\]\])/g;

  // Find matches for content between double brackets including the brackets
  // e.g. [[Example]] -> [[Example]]
  const bracketRegexInclusive = /\[\[.*?\]\]/g;

  return processRegExps(bracketRegexInclusive, bracketRegexExclusive, content, nameToSlugMap, pluginOptions);
}

function generateSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const publicOptionsSchema = ({ Joi }) =>
  Joi.object({
    thoughtsDirectory: Joi.string().default('content/garden/'),
    exclude: Joi.array().items(Joi.string()).default([]),
    excludeAsPrivate: Joi.array().items(Joi.string()).default([]),
    privateMarkdown: Joi.string().default('This note is a [[private note]]'),
    showPrivateLocally: Joi.boolean().default(true),
    showHiddenLocally: Joi.boolean().default(true),
    generateSlug: Joi.function().default(function () {
      return generateSlug;
    }),
    rootPath: Joi.string().default('/'),
    rootThought: Joi.string().default('about'),
  });

module.exports = publicOptionsSchema;

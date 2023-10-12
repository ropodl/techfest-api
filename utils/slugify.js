exports.slugify = (req, res, next) => {
  let { title, slug } = req.body;
  // Define a list of linking verbs to remove
  const linkingVerbs = ['a', 'am', 'is', 'are', 'was', 'were', 'be','and', 'been', 'being', 'am', 'is', 'has', 'have', 'had'];
  // Convert the input string to lowercase
  slug = title.toLowerCase();
  // Remove linking verbs from the string
  linkingVerbs.forEach((verb) => {
    const verbRegex = new RegExp(`\\b${verb}\\b`, 'g'); // Using word boundaries to match whole words
    slug = slug.replace(verbRegex, '');
  });
  // Replace spaces with hyphens and remove non-alphanumeric characters
  slug = slug.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  req.body.slug = slug;
  next();
}

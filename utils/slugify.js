exports.slugify = async (string, schema) => {
  // Convert the input string to lowercase.
  string = string.toLowerCase();

  // Remove linking verbs from the string.
  const linkingVerbs = ['a', 'am', 'is', 'are', 'was', 'were', 'be', 'and', 'been', 'being', 'am', 'is', 'has', 'have', 'had'];
  linkingVerbs.forEach((verb) => {
    const verbRegex = new RegExp(`\\b${verb}\\b`, 'g'); // Using word boundaries to match whole words
    string = string.replace(verbRegex, '');
  });

  // Replace spaces with hyphens and remove non-alphanumeric characters.
  string = string.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Remove leading and trailing hyphens.
  string = string.replace(/^-+|-+$/g, '');

  // Check if the schema is defined.
  if (schema) {
    // Check if the slug already exists in the database.
    const existingBlog = await schema.findOne({ slug: string });
    if (existingBlog) {
      // Append a unique identifier to the slug.
      string += '-' + Date.now();
    }
  }

  return string;
}
const BlogSchema = require("../../models/blog");
const { paginate } = require("../../utils/paginate");

exports.blogs = async (req, res) => {
  const paginatedBlog = await paginate(
    BlogSchema,
    1,
    12,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const blogs = await Promise.all(
    paginatedBlog.documents.map(async (blog) => {
      const { id, title, slug, featuredImage, createdAt } = blog;
      return {
        id,
        title,
        slug,
        featuredImage,
        createdAt,
      };
    })
  );
  res.json({ blogs, pagination: paginatedBlog.pagination });
};

exports.blog = async (req, res) => {
  const { slug } = req.params;

  const blog = await BlogSchema.findOne({ slug }).populate({
    path: "categories",
    select: ["title slug"],
  });
  if (!blog) return sendError(res, "Invalid request, Blog not found", 404);

  const { title, excerpt, content, featuredImage, categories, createdAt } =
    blog;

  res.json({ title, excerpt, content, featuredImage, categories, createdAt });
};

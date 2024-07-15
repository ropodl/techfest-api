const { isValidObjectId } = require("mongoose");
const BlogSchema = require("../models/blog");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { slugify } = require("../utils/slugify");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { title, content, excerpt, status } = req.body;
  const { file } = req;

  const featuredImage = {
    url: ImgUrl(req, res, file),
    name: file.filename,
  };

  const slug = await slugify(title, BlogSchema);

  const blog = new BlogSchema({
    title,
    content,
    slug,
    excerpt,
    status,
    featuredImage,
  });

  await blog.save();

  res.json({
    slug,
    success: true,
    message: "Blog added Successfully",
  });
};

exports.update = async (req, res) => {
  const { title, content, excerpt, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id)) return sendError(res, "Blog ID not valid", 404);

  const blog = await BlogSchema.findById(id);
  if (!blog) return sendError(res, "Blog not found", 404);

  if (title !== blog.title) blog.slug = await slugify(title, BlogSchema);

  blog.title = title;
  blog.content = content;
  blog.excerpt = excerpt;
  blog.status = status;

  if (file)
    blog.featuredImage = {
      url: ImgUrl(req, res, file),
      name: file.filename,
    };

  await blog.save();

  res.json({ success: true, message: "Blog updated successfully" });
};

exports.blog = async (req, res) => {
  const { slug } = req.params;

  const blog = await BlogSchema.findOne({ slug });
  if (!blog) return sendError(res, "Invalid request, Blog not found", 404);

  res.json(blog);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  console.log(itemsPerPage,"itemsPerPage")
  console.log(page,"page")
  
  const paginatedBlog = await paginate(
    BlogSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );
  console.log(paginatedBlog,"paginatedBlog")

  const blogs = await Promise.all(
    paginatedBlog.documents.map(async (blog) => {
      // await blog.populate({ path: "categories", select: "title slug" });
      const {
        id,
        title,
        slug,
        excerpt,
        featuredImage,
        status,
        createdAt,
        updatedAt,
      } = blog;
      return {
        id,
        title,
        slug,
        excerpt,
        featuredImage,
        status,
        createdAt,
        updatedAt,
      };
    })
  );
  res.json({ blogs, pagination: paginatedBlog.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID");

  const blog = BlogSchema.findById(id);
  if (!blog) return sendError(res, "Blog not found", 404);

  await BlogSchema.findByIdAndDelete(id);

  res.json({ message: "Blog removed successfully" });
};
exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID");

      const blog = BlogSchema.findById(id);
      if (!blog) return sendError(res, "Blog not found", 404);

      await BlogSchema.findByIdAndDelete(id);
    }
  }
  res.json({ message: "Multiple Blogs Deleted" });
};

const { isValidObjectId } = require("mongoose");
const BlogSchema = require("../models/blog");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { slugify } = require("../utils/slugify");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { title, content, excerpt, categories, status } = req.body;
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
    categories,
    status,
    featuredImage,
  });

  if (categories) {
    for (let item of categories.split(",")) {
      if (!isValidObjectId(item)) {
        return sendError(res, "Invalid Category");
      }
    }
    blog.categories = categories.split(",");
  }

  await blog.save();

  res.json({
    success: true,
    blog: {
      title,
      content,
      excerpt,
      status,
      slug,
      featuredImage,
      categories,
    },
  });
};

exports.update = async (req, res) => {
  const { title, content, excerpt, categories, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id)) return sendError(res, "Blog ID not valid", 404);

  const blog = await BlogSchema.findById(id);
  if (!blog) return sendError(res, "Blog not found", 404);

  if (categories) {
    for (let item of categories.split(",")) {
      if (!isValidObjectId(item)) {
        return sendError(res, "Invalid Category");
      }
    }
    blog.categories = categories.split(",");
  } else return sendError(res, "No Category selected");

  if (title !== blog.title) blog.slug = await slugify(title, BlogSchema);

  blog.title = title;
  blog.content = content;
  blog.excerpt = excerpt;
  blog.status = status;

  if (file)
    blog.featuredImage = {
      url:
        (process.env.app_dev ? "http://" : "https://") +
        req.hostname +
        (process.env.app_port ? `:${process.env.app_port}` : "") +
        "/" +
        file.path,
      name: file.filename,
    };

  await blog.save();

  res.json({ success: true, message: "Blog updated successfully" });
};

exports.blog = async (req, res) => {
  const { slug } = req.params;

  const blog = await BlogSchema.findOne({ slug }).populate({
    path: "categories",
    select: ["title slug"],
  });
  if (!blog) return sendError(res, "Invalid request, Blog not found", 404);

  res.json(blog);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedBlog = await paginate(
    BlogSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const blogs = await Promise.all(
    paginatedBlog.documents.map(async (blog) => {
      await blog.populate({ path: "categories", select: "title slug" });
      const {
        id,
        title,
        slug,
        excerpt,
        featuredImage,
        categories,
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
        categories,
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

exports.search = async (req, res) => {
  const { title } = req.body;
  console.log(title);
};

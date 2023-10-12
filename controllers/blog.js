const { isValidObjectId } = require("mongoose");
const BlogSchema = require("../models/blog");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
    const { title, content, excerpt, categories, tags, slug, status, visibility } = req.body;
    const { file } = req;

    let featuredImage = {
        url: (process.env.app_dev ? "http://" : "https://") + req.hostname + (process.env.app_port ? `:${process.env.app_port}` : '') + "/" + file.path,
        name: file.filename
    }

    const blog = new BlogSchema({ title, content, excerpt, slug, categories, tags, status, visibility, featuredImage })

    if (categories) {
        for (let item of categories.split(",")) {
            if (!isValidObjectId(item)) { return sendError(res, "Invalid Category"); }
        }
        blog.categories = categories.split(",")
    }

    if (tags) {
        for (let item of tags.split(",")) {
            if (!isValidObjectId(item)) { return sendError(res, "Invalid Tag/s"); }
        }
        blog.tags = tags.split(",")
    }

    await blog.save()

    res.json({
        success: true,
        blog: {
            title, content, excerpt, status, slug, visibility, featuredImage,
            categories, tags
        }
    })
}

exports.update = async (req, res) => {
    const { title, content, excerpt, categories, tags, slug, status, visibility } = req.body;
    const { id } = req.params;
    const { file } = req;

    if(!isValidObjectId(id)) return sendError(res,"Blog ID not valid",404);

    const blog = await BlogSchema.findById(id);
    if(!blog) return sendError(res,"Blog not found",404);

    if (categories) {
        for (let item of categories.split(",")) {
            if (!isValidObjectId(item)) { return sendError(res, "Invalid Category"); }
        }
        blog.categories = categories.split(",")
    } else return sendError(res,"No Category selected");

    if (tags) {
        for (let item of tags.split(",")) {
            if (!isValidObjectId(item)) { return sendError(res, "Invalid Tag/s"); }
        }
        blog.tags = tags.split(",")
    }

    blog.title = title;
    blog.content = content;
    blog.excerpt = excerpt;
    if(blog.slug !== slug) blog.slug = slug;
    blog.status = status;
    blog.visibility = visibility;

    if(file) blog.featuredImage = {
            url: (process.env.app_dev ? "http://" : "https://") + req.hostname + (process.env.app_port ? `:${process.env.app_port}` : '') + "/" + file.path,
            name: file.filename
        };

    await blog.save();

    res.json({ success: true,message: "Blog updated successfully" });
}

exports.blog = async (req, res) => {
    const { slug } = req.params;

    // if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID");

    const blog = await BlogSchema.findOne({ slug }).populate({ path: "categories", select: ["title", "slug"] }).populate({ path: "tags", select: ["title", "slug"] });
    if (!blog) return sendError(res, "Invalid request, Blog not found", 404)

    //const { id,title, excerpt, content, featuredImage, categories, tags, status, visibility } = blog;
    res.json({ success: true, blog });
}

exports.latest = async (req, res) => {
    const result = await BlogSchema.find().sort({ createdAt: "-1" }).limit(10);
    const blogs = result.map((blog) => {
        const { id, title, content, status, slug, visibility, featuredImage } = blog;
        return {
            id, title, content, status, slug, visibility, featuredImage
        };
    });
    res.json(blogs);
}

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) - 1 || 0;

    const blogCount = await BlogSchema.countDocuments();
    const result = await BlogSchema.find()
        .populate({ path: "categories", select: ["title", "slug"] })
        .populate({ path: "tags", select: ["title", "slug"] })
        .sort({ createdAt: "-1" })
        .skip(page * itemsPerPage)
        .limit(page === -1 ? itemsPerPage : 0);
    const blogs = result.map((blog) => {
        const { id, title,
        //content,
        excerpt, status, visibility, featuredImage, categories, tags, slug, createdAt } = blog;
        return {
            id, title,
            // content,
            excerpt, status, visibility, featuredImage, categories, tags, slug, createdAt
        };
    });
    // blogs.populate("categories")
    res.json({ blogs, pagination: { totalPage: Math.ceil(blogCount / itemsPerPage), totalItems: blogCount, itemsPerPage, currentPage: page + 1 } });
}

exports.remove = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID")

    const blog = BlogSchema.findById(id)
    if (!blog) return sendError(res, "Blog not found", 404);

    await BlogSchema.findByIdAndDelete(id)

    res.json({ message: "Blog removed successfully" });
}
exports.removeBulk = async (req, res) => {
    const { ids } = req.body;
    console.log(ids);
    if (ids) {
        for (id of ids) {
            if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID")

            const blog = BlogSchema.findById(id)
            if (!blog) return sendError(res, "Blog not found", 404);

            await BlogSchema.findByIdAndDelete(id)
        }
    }
    res.json({ message: "Multiple Blogs Deleted" })
}

exports.search = async (req, res) => {
    const { title } = req.body;
    console.log(title)
}

const { isValidObjectId } = require("mongoose");
const CategoryScheme = require("../models/category.js");
const { paginate } = require("../utils/paginate.js");
const { slugify } = require("../utils/slugify.js");
const { sendError } = require("../utils/error.js");

exports.create = async (req, res) => {
    const { title, description } = req.body;

    const slug = await slugify(title, CategoryScheme)

    const category = new CategoryScheme({ title, slug, description, });

    await category.save();

    res.json({ success: true, message: "Category was created successfully" })
};

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) === -1 ? 0 : parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) || 0;

    const paginatedCategory = await paginate(CategoryScheme, page, itemsPerPage)

    const categories = paginatedCategory.documents.map(({ id, title, slug, description }) => {
        return { id, title, slug, description }
    })
    res.json({ categories, pagination: paginatedCategory.pagination });
};

exports.remove = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return sendError(res, "Invalid Category ID")

    const category = CategoryScheme.findById(id)
    if (!category) return sendError(res, "Category not found", 404);

    await CategoryScheme.findByIdAndDelete(id)

    res.json({ success: true, message: "Blog removed successfully" });
};

exports.removeBulk = async (req, res) => {
    const { ids } = req.body;
    console.log(ids);
    if (ids) {
        for (id of ids) {
            if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID")

            const category = CategoryScheme.findById(id)
            if (!category) return sendError(res, "Category not found", 404);

            await CategoryScheme.findByIdAndDelete(id)
        }
    }
    res.json({ success: true, message: "Multiple Blogs Deleted" })
};
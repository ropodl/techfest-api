const CategoryScheme = require("../models/category.js");

exports.create = async (req, res) => {
    const { title, description, slug } = req.body;

    const category = new CategoryScheme({ title, description, slug });

    await category.save();

    res.json({ success: true, category: { title, description, slug } })
};

exports.latest = async (req, res) => {
    const result = await CategoryScheme.find().sort({ createdAt: "-1" }).limit(10);
    const categories = result.map((category) => {
        const { id, title, slug, description } = category;
        return {
            id, title, slug, description
        };
    });
    res.json(categories);
};

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) - 1 || 0;

    const categoryCount = await CategoryScheme.countDocuments();
    const result = await CategoryScheme.find()
        .sort({ createdAt: "-1" })
        .skip(page * itemsPerPage)
        .limit(page === -1 ? 0 : itemsPerPage);
    const categories = result.map((category) => {
        const { title, slug, description } = category;
        return {
            title, slug, description,
        };
    });
    res.json({ categories, pagination: { totalPage: Math.ceil(categoryCount / itemsPerPage), totalItems: categoryCount, itemsPerPage, currentPage: page + 1 } });
};

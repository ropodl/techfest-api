const BlogSchema = require("../models/blog")
exports.home = async (req, res) => {
	const blogCount = await BlogSchema.countDocuments();
	res.json({ status: true, blogCount })
}
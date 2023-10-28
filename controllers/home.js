const BlogSchema = require("../models/blog")
exports.home = async (req, res) => {
	console.log(req.user)
	const blogCount = await BlogSchema.countDocuments();
	res.json({ status: true, blogCount })
}
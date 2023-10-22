const sponsorSchema = require("../models/sponsor")

exports.create = (req, res) => {
    const { name, level, link, info } = req.body;
    const { file } = req;
    res.json("test")
}
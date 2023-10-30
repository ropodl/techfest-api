const { isValidObjectId } = require("mongoose");
const SponsorSchema = require("../models/sponsor");

exports.create = async (req, res) => {
    const { name, level, link, description, perks, status } = req.body;
    const { file } = req;

    const sponsorImage = {
        url: (process.env.app_dev ? "http://" : "https://") + req.hostname + (process.env.app_port ? `:${process.env.app_port}` : '') + "/" + file.path,
        name: file.filename
    }

    const sponsor = new SponsorSchema({ name, sponsorImage, level, link, description, perks, status });

    await sponsor.save();

    res.json({ success: true })
};

exports.update = async (req, res) => {
    const { name, level, link, description, perks, status } = req.body;
    const { id } = req.params;
    const { file } = req;

    if (!isValidObjectId(id)) return sendError(res, "Sponsor ID not valid", 404);

    const sponsor = await SponsorSchema.findById(id);
    if (!sponsor) return sendError(res, "Blog not found", 404);

    sponsor.name = name;
    sponsor.level = level;
    sponsor.link = link;
    sponsor.description = description;
    sponsor.perks = perks;
    sponsor.status = status;

    if (file) sponsor.sponsorImage = {
        url: (process.env.app_dev ? "http://" : "https://") + req.hostname + (process.env.app_port ? `:${process.env.app_port}` : '') + "/" + file.path,
        name: file.filename
    };

    await sponsor.save();

    res.json({ success: true, message: "Sponsor updated successfully" });
}
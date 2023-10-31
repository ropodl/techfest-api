const PrivacySchema = require("../models/privacy");
const { sendError } = require("../utils/error");

exports.get = async (req, res) => {
    const privacy = await PrivacySchema.findOne();
    res.json({ id: privacy.id, content: privacy.content, status: privacy.status });
}

exports.create = async (req, res) => {
    const { content, status } = req.body;

    const oldPrivacy = await PrivacySchema.findOne();
    if (oldPrivacy) return sendError(res, "Privacy Policy already created");

    const privacy = new PrivacySchema({ content, status });

    await privacy.save();

    res.json({ success: true, privacy: { id: privacy.id, content: privacy.content, status: privacy.status } });
};

exports.update = async (req, res) => {
    const { content, status } = req.body;

    const privacy = await PrivacySchema.findOne();

    privacy.content = content;
    privacy.status = status;

    await privacy.save();

    res.json({ success: true, privacy: { id: privacy.id, content: privacy.content, status: privacy.status } })
};
const TermsSchema = require("../models/terms");
const { sendError } = require("../utils/error");

exports.get = async (req, res) => {
    const terms = await TermsSchema.findOne();
    res.json({ id: terms.id, content: terms.content, status: terms.status });
}

exports.create = async (req, res) => {
    const { content, status } = req.body;

    const oldTerms = await TermsSchema.findOne();
    if (oldTerms) return sendError(res, "Terms and Conditions already created");

    const terms = new TermsSchema({ content, status });

    await terms.save();

    res.json({ success: true, terms: { id: terms.id, content: terms.content, status: terms.status } });
};

exports.update = async (req, res) => {
    const { content, status } = req.body;

    const terms = await TermsSchema.findOne();

    terms.content = content;
    terms.status = status;

    await terms.save();

    res.json({ success: true, terms: { id: terms.id, content: terms.content, status: terms.status } })
};
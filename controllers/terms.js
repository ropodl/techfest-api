const TermsSchema = require("../models/terms");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
    const { content, status } = req.body;

    const oldTerms = await TermsSchema.findOne({});
    if (oldTerms) return sendError(res, "Terms and Condition already exists");

    const terms = new TermsSchema({ content, status });

    console.log(terms)

    await terms.save();

    res.json({ success: true, terms })
}

exports.update = async (req, res) => {
    const { content, status } = req.body;

    const terms = await TermsSchema.findOne();

    if (!terms) return sendError(res, "Terms and Conditions not found", 404);

    terms.content = content;
    terms.status = status;

    await terms.save();

    res.json({ success: true, terms, message: "Terms and Conditions updated successfully" })
}

exports.terms = async (req, res) => {
    const terms = await TermsSchema.findOne();
    if (!terms) return sendError(res, "Terms and Conditions not found", 404)
    res.json(terms);
}
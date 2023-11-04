const { isValidObjectId } = require("mongoose");
const ContactFormSchema = require("../models/contactRequest")

exports.create = async (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    const request = new ContactFormSchema({
        name, phone, email, subject, message
    });

    await request.save();

    res.json({ success: true })
};

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) - 1 || 0;

    const contactFormCount = await ContactFormSchema.countDocuments();
    const result = await ContactFormSchema.find()
        .sort({ createdAt: "-1" })
        .skip(page * itemsPerPage)
        .limit(page === -1 ? 0 : itemsPerPage);
    const requests = result.map((request) => {
        const { id, name, phone, email, subject, message, } = request;
        return {
            id, name, phone, email, subject, message,
        };
    });

    const pagination = {
        totalPage: Math.ceil(contactFormCount / itemsPerPage),
        totalItems: contactFormCount,
        itemsPerPage,
        currentPage: page + 1
    }

    res.json({ requests, pagination });
};

exports.remove = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return sendError(res, "Invalid Contact Request ID")

    const request = ContactFormSchema.findById(id)
    if (!request) return sendError(res, "Contact Request not found", 404);

    await ContactFormSchema.findByIdAndDelete(id)

    res.json({ message: "Contact Request removed successfully" });
};

exports.removeBulk = async (req, res) => {
    const { ids } = req.body;
    
    if (ids) {
        for (id of ids) {
            if (!isValidObjectId(id)) return sendError(res, "Invalid Contact Request ID")

            const request = ContactFormSchema.findById(id)
            if (!request) return sendError(res, "Contact Request not found", 404);

            await ContactFormSchema.findByIdAndDelete(id)
        }
    }
    res.json({ message: "Multiple Contact Request Deleted" });
};
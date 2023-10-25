const ContactFormSchema = require("../models/contactRequest")

exports.create = async (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    const request = new ContactFormSchema({
        name, phone, email, subject, message
    })

    await request.save();

    res.json({ success: true })
}

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
    // console.log(itemsPerPage)
    // blogs.populate("categories")
    res.json({ requests, pagination });
}
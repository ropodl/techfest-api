const ResourceSchema = require("../models/resource");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
    const { title, except, status } = req.body;
    const { file } = req;

    res.json({ success: true })
};

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) === -1 ? 0 : parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) || 0;

    const paginatedResource = await paginate(ResourceSchema, page, itemsPerPage)

    const resource = paginatedResource.documents.map(({ id, title, excerpt, file, status }) => {
        return { id, title, excerpt, file, status }
    })
    res.json({ resource, pagination: paginatedResource.pagination });
}
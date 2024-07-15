const ResourceSchema = require("../models/resource");
const { ImgUrl } = require("../utils/generateImgUrl");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
    const { title, status } = req.body;
    const { file:doc } = req;

    const file = {
        url: ImgUrl(req,res,doc),
        name: doc.name
    }

    const resource = new ResourceSchema({
        title,status,file
    })

    await resource.save();

    res.json({success: true, message: "Resource added successfully" })
};

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const resource = await ResourceSchema.findById(id);
        if (!resource) {
            return res.status(404).json({ success: false, message: "Resource not found" });
        }
        res.json({ success: true, resource });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching resource", error });
    }
};


exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const { file:doc } = req;

    let updateData = { title, status };

    if (doc) {
        const file = {
            url: ImgUrl(req, res, doc),
            name: doc.name
        };
        updateData.file = file;
    }

    try {
        const updatedResource = await ResourceSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ success: false, message: "Resource not found" });
        }
        res.json({ success: true, message: "Resource updated successfully", resource: updatedResource });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating resource", error });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResource = await ResourceSchema.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ success: false, message: "Resource not found" });
        }
        res.json({ success: true, message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting resource", error });
    }
};



exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) === -1 ? 0 : parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) || 0;

    const paginatedResource = await paginate(ResourceSchema, page, itemsPerPage)

    const resource = paginatedResource.documents.map(({ id, title, file, status }) => {
        return { id, title, file, status }
    })
    res.json({ resource, pagination: paginatedResource.pagination });
}

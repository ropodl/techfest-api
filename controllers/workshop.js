const { isValidObjectId } = require("mongoose");
const WorkshopSchema = require("../models/workshop");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
    const { title, description, status } = req.body;
    const { file } = req;

    if (!file) return sendError(res, "Image not uploaded");

    const workshopImage = {
        url: (process.env.app_dev == "true" ? "http://" : "https://") + req.hostname + (process.env.app_dev == "true" ? `:${process.env.app_port}` : "") + "/" +file.path,
        name: file.filename
    };

    const workshop = new WorkshopSchema({ title, description, workshopImage, status });

    const { id } = await workshop.save();

    res.json({
        id,
        success: true,
        message: "Workshop added successfully"
    });
};

exports.update = async (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const { file } = req;

    if (!isValidObjectId(id)) return sendError(res, "Workshop ID not valid", 404);

    const workshop = await WorkshopSchema.findById(id);
    if (!workshop) return sendError(res, "Workshop not found", 404);

    workshop.title = title;
    workshop.description = description;
    workshop.status = status;

    if (file) workshop.workshopImage = {
        url: (process.env.app_dev == "true" ? "http://" : "https://") + req.hostname + (process.env.app_dev == "true" ? `:${process.env.app_port}` : "") + "/" +file.path,
        name: file.filename
    };

    await workshop.save();

    res.json({ success: true, message: "Workshop updated successfully" });
};

exports.workshop = async (req, res) => {
    const { id } = req.params;

    const workshop = await WorkshopSchema.findOne({ _id: id });
    if (!workshop)
        return sendError(res, "Invalid request, Workshop not found", 404)

    res.json(workshop);
};

exports.all = async (req, res) => {
    const itemsPerPage = parseInt(req.query.per_page) === -1 ? 0 : parseInt(req.query.per_page) || 10;
    const page = parseInt(req.query.page) || 0;

    const paginatedWorkshop = await paginate(WorkshopSchema, page, itemsPerPage, {}, { createdAt: "-1" });

    const workshops = await Promise.all(paginatedWorkshop.documents.map(async (workshop) => {
        const { id, title, workshopImage, description, status, createdAt, updatedAt } = workshop;
        return { id, title, workshopImage, description, status, createdAt, updatedAt }
    }))
    res.json({ workshops, pagination: paginatedWorkshop.pagination });
};

exports.remove = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return sendError(res, "Invalid Workshop ID")

    const workshop = WorkshopSchema.findById(id)
    if (!workshop) return sendError(res, "Workshop not found", 404);

    await WorkshopSchema.findByIdAndDelete(id)

    res.json({ success: true, message: "Workshop removed successfully" });
};

exports.removeBulk = async (req, res) => {
    const { ids } = req.body;
    if (ids) {
        for (id of ids) {
            if (!isValidObjectId(id)) return sendError(res, "Invalid Workshop ID")

            const workshop = WorkshopSchema.findById(id)
            if (!workshop) return sendError(res, "Workshop not found", 404);

            await WorkshopSchema.findByIdAndDelete(id)
        }
    }
    res.json({ success: true, message: "Multiple Workshops Deleted" })
};

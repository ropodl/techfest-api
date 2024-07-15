const { isValidObjectId } = require("mongoose");
const SponsorLevelSchema = require("../models/level");
const { paginate } = require("../utils/paginate");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
  const { title, priority, status } = req.body;

  const oldLevel = await SponsorLevelSchema.findOne({ priority });
  if (oldLevel) return sendError(res, "Level already exists");

  const sponsorLevel = new SponsorLevelSchema({
    title,
    priority,
    status,
  });

  const { id } = await sponsorLevel.save();

  res.json({
    id,
    success: true,
    message: "Sponsor Level add successfully",
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, priority, status } = req.body;

  if (!isValidObjectId(id)) return sendError(res, "Sponsor Level ID not valid");

  const oldLevel = await SponsorLevelSchema.findOne({ priority });
  if (oldLevel) return sendError(res, "Level already exists");

  const sponsorLevel = await SponsorLevelSchema.findById(id);
  if (!sponsorLevel) return sendError(res, "Sponsor Level not found", 404);

  sponsorLevel.title = title;
  sponsorLevel.priority = priority;
  sponsorLevel.status = status;

  await sponsorLevel.save();

  res.json({ success: true, message: "Sponsor Level updated successfully" });
};

exports.sponsorLevel = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)

  if (!isValidObjectId(id)) return sendError(res, "Sponsor Level ID not valid");

  const sponsorLevel = await SponsorLevelSchema.findOne({ _id: id });
  if (!sponsorLevel)
    return sendError(res, "Invalid request, Sponsor Level not found", 404);

  const { _id, title, priority, status } = sponsorLevel;

  res.json({
    id: _id,
    title,
    priority,
    status,
  });
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedSponsor = await paginate(
    SponsorLevelSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const levels = paginatedSponsor.documents.map(
    ({ id, title, priority, status }) => {
      return {
        id,
        title,
        priority,
        status,
      };
    }
  );
  res.json({ levels, pagination: paginatedSponsor.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Sponsor Level ID");

  const sponsorLevel = SponsorLevelSchema.findById(id);
  if (!sponsorLevel) return sendError(res, "Sponsor Level not found", 404);

  await SponsorLevelSchema.findByIdAndDelete(id);

  res.json({ success: true, message: "Sponsor Level removed successfully" });
};

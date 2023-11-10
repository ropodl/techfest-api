const { isValidObjectId } = require("mongoose");
const SponsorSchema = require("../models/sponsor");
const { paginate } = require("../utils/paginate");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { name, level, link, description, status } = req.body;
  const { file } = req;

  const sponsorImage = {
    url: ImgUrl(req, res, file),
    name: file.filename,
  };

  const sponsor = new SponsorSchema({
    name,
    sponsorImage,
    level,
    link,
    description,
    status,
  });

  await sponsor.save();

  res.json({ success: true, message: "Sponsor added successfully" });
};

exports.update = async (req, res) => {
  const { name, level, link, description, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id)) return sendError(res, "Sponsor ID not valid", 404);

  const sponsor = await SponsorSchema.findById(id);
  if (!sponsor) return sendError(res, "Blog not found", 404);

  sponsor.name = name;
  sponsor.level = level;
  sponsor.link = link;
  sponsor.description = description;
  sponsor.status = status;

  if (file)
    sponsor.sponsorImage = {
      url: ImgUrl(req, res, file),
      name: file.filename,
    };

  await sponsor.save();

  res.json({ success: true, message: "Sponsor updated successfully" });
};

exports.sponsor = async (req, res) => {
  const { id } = req.params;

  const sponsor = await SponsorSchema.findOne({ id });
  if (!sponsor)
    return sendError(res, "Invalid request, Sponsor not found", 404);

  res.json(sponsor);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedSponsor = await paginate(
    SponsorSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const sponsors = await Promise.all(
    paginatedSponsor.documents.map(async (sponsor) => {
      await sponsor.populate({ path: "level", select: "title priority" });
      const { id, name, sponsorImage, level, link, description, status } =
        sponsor;
      return { id, name, sponsorImage, level, link, description, status };
    })
  );
  res.json({ sponsors, pagination: paginatedSponsor.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Sponsor ID");

  const sponsor = SponsorSchema.findById(id);
  if (!sponsor) return sendError(res, "Sponsor not found", 404);

  await SponsorSchema.findByIdAndDelete(id);

  res.json({ message: "Sponsor removed successfully" });
};
exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid Sponsor ID");

      const sponsor = SponsorSchema.findById(id);
      if (!sponsor) return sendError(res, "Sponsor not found", 404);

      await SponsorSchema.findByIdAndDelete(id);
    }
  }
  res.json({ message: "Multiple Sponsors Deleted" });
};

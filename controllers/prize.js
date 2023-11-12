const { isValidObjectId } = require("mongoose");
const PrizeSchema = require("../models/prize");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { title, description, status } = req.body;
  const { file } = req;

  const prizeImage = {
    url: ImgUrl(req, res, file),
    name: file.filename,
  };

  const prize = new PrizeSchema({ title, prizeImage, description, status });

  const { id } = await prize.save();

  res.json({
    id,
    success: true,
    message: "Prize Added Successfully",
  });
};

exports.update = async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id)) return sendError(res, "Prize ID not valid", 404);

  const prize = await PrizeSchema.findById(id);
  if (!prize) return sendError(res, "Prize not found", 404);

  prize.title = title;
  prize.description = description;
  prize.status = status;

  if (file)
    prize.prizeImage = {
      url: ImgUrl(req, res, file),
      name: file.filename,
    };

  await prize.save();

  res.json({ success: true, message: "Prize updated successfully" });
};

exports.prize = async (req, res) => {
  const { id } = req.params;

  const prize = await PrizeSchema.findOne({ _id: id });
  if (!prize) return sendError(res, "Invalid request, Prize not found", 404);

  res.json(prize);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedPrize = await paginate(
    PrizeSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const prizes = await Promise.all(
    paginatedPrize.documents.map(async (prize) => {
      // await prize.populate({ path: "categories", select: "title slug" });
      const {
        id,
        title,
        description,
        prizeImage,
        status,
        createdAt,
        updatedAt,
      } = prize;
      return {
        id,
        title,
        description,
        prizeImage,
        status,
        createdAt,
        updatedAt,
      };
    })
  );
  res.json({ prizes, pagination: paginatedPrize.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID");

  const prize = PrizeSchema.findById(id);
  if (!prize) return sendError(res, "Prize not found", 404);

  await PrizeSchema.findByIdAndDelete(id);

  res.json({ success: true, message: "Prize removed successfully" });
};
exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid Prize ID");

      const prize = PrizeSchema.findById(id);
      if (!prize) return sendError(res, "Prize not found", 404);

      await PrizeSchema.findByIdAndDelete(id);
    }
  }
  res.json({ success: true, message: "Multiple Prize Deleted" });
};

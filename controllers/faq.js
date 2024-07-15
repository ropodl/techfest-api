const { isValidObjectId } = require("mongoose");
const FaqSchema = require("../models/faq");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
  const { title, content, status } = req.body;

  const faq = new FaqSchema({
    title,
    content,
    status,
  });

  const { id } = await faq.save();

  res.json({
    id,
    success: true,
    message: "FAQ added successfully",
  });
};

exports.update = async (req, res) => {
  const { title, content, status } = req.body;
  const { id } = req.params;
  console.log(id);

  if (!isValidObjectId(id)) return sendError(res, "FAQ ID not valid", 404);

  const faq = await FaqSchema.findById(id);
  if (!faq) return sendError(res, "FAQ not found", 404);

  faq.title = title;
  faq.content = content;
  faq.status = status;

  await faq.save();

  res.json({ success: true, message: "FAQ updated successfully" });
};

exports.faq = async (req, res) => {
  const { id } = req.params;

  const faq = await FaqSchema.findOne({ _id: id });
  if (!faq) return sendError(res, "Invalid request, FAQ not found", 404);

  const { title, content, status } = faq;

  res.json({ id, title, content, status });
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedFaq = await paginate(
    FaqSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const faqs = await Promise.all(
    paginatedFaq.documents.map(async (faq) => {
      const { id, title, content,status } = faq;
      return { id, title, content,status };
    })
  );
  res.json({ faqs, pagination: paginatedFaq.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid FAQ ID");

  const faq = FaqSchema.findById(id);
  if (!faq) return sendError(res, "FAQ not found", 404);

  await FaqSchema.findByIdAndDelete(id);

  res.json({ message: "FAQ removed successfully" });
};
exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid FAQ ID");

      const faq = FaqSchema.findById(id);
      if (!faq) return sendError(res, "FAQ not found", 404);

      await FaqSchema.findByIdAndDelete(id);
    }
  }
  res.json({ message: "Multiple FAQ Deleted" });
};

const WorkshopSchema = require("../../models/workshop");
const { paginate } = require("../../utils/paginate");

exports.workshops = async (req, res) => {
  const paginatedWorkshop = await paginate(
    WorkshopSchema,
    1,
    0,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const workshops = await Promise.all(
    paginatedWorkshop.documents.map(async (workshop) => {
      const { id, title, workshopImage } = workshop;
      return {
        id,
        title,
        workshopImage,
      };
    })
  );
  res.json(workshops);
};
exports.workshop = async (req, res) => {
  const { id } = req.params;

  const workshop = await WorkshopSchema.findOne({ _id: id });
  if (!workshop) return sendError(res, "Invalid request, Event not found", 404);

  const { title, description, link, workshopImage, status } = workshop;

  res.json({ title, description, link, workshopImage, status });
};

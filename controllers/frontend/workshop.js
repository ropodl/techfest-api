const WorkshopSchema = require("../../models/workshop");
const { paginate } = require("../../utils/paginate");

exports.workshop = async (req, res) => {
  const paginatedWorkshop = await paginate(
    WorkshopSchema,
    1,
    0,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const workshops = await Promise.all(
    paginatedWorkshop.documents.map(async (workshop) => {
      const { id, title, workshopImage, description } = workshop;
      return {
        id,
        title,
        workshopImage,
        description,
      };
    })
  );
  res.json(workshops);
};

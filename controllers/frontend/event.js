const EventSchema = require("../../models/event");
const { paginate } = require("../../utils/paginate");

exports.events = async (req, res) => {
  const paginatedEvent = await paginate(
    EventSchema,
    1,
    0,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const events = await Promise.all(
    paginatedEvent.documents.map(async (event) => {
      const { id, title, eventImage } = event;
      return {
        id,
        title,
        eventImage,
      };
    })
  );
  res.json(events);
};

exports.event = async (req, res) => {
  const { id } = req.params;

  const event = await EventSchema.findOne({ _id: id });
  if (!event) return sendError(res, "Invalid request, Event not found", 404);

  const { title, description, link, eventImage, status } = event;

  res.json({ title, description, link, eventImage, status });
};

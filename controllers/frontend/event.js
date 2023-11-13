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
      const { id, title, description, link, eventImage } = event;
      return {
        id,
        title,
        description,
        link,
        eventImage,
      };
    })
  );
  res.json(events);
};

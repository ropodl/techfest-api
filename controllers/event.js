const { isValidObjectId } = require("mongoose");
const EventSchema = require("../models/event");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { title, description, link, status } = req.body;
  const { file } = req;

  if (!file) return sendError(res, "Image not uploaded");

  const eventImage = {
    url: ImgUrl(req, res, file),
    name: file.filename,
  };

  const event = new EventSchema({
    title,
    description,
    eventImage,
    link,
    status,
  });

  const { id } = await event.save();

  res.json({
    id,
    success: true,
    message: "Pre Event added successfully",
  });
};

exports.update = async (req, res) => {
  const { title, description, link, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id)) return sendError(res, "Event ID not valid", 404);

  const event = await EventSchema.findById(id);
  if (!event) return sendError(res, "Event not found", 404);

  event.title = title;
  event.description = description;
  event.link = link;
  event.status = status;

  if (file)
    event.eventImage = {
      url: ImgUrl(req, res, file),
      name: file.filename,
    };

  await event.save();

  res.json({ success: true, message: "Event updated successfully" });
};

exports.event = async (req, res) => {
  const { id } = req.params;

  const event = await EventSchema.findOne({ _id: id });
  if (!event) return sendError(res, "Invalid request, Event not found", 404);

  res.json(event);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedEvent = await paginate(
    EventSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const events = await Promise.all(
    paginatedEvent.documents.map(async (event) => {
      const {
        id,
        title,
        link,
        eventImage,
        description,
        status,
        createdAt,
        updatedAt,
      } = event;
      return {
        id,
        title,
        link,
        eventImage,
        description,
        status,
        createdAt,
        updatedAt,
      };
    })
  );
  res.json({ events, pagination: paginatedEvent.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Event ID");

  const event = EventSchema.findById(id);
  if (!event) return sendError(res, "Event not found", 404);

  await EventSchema.findByIdAndDelete(id);

  res.json({ success: true, message: "Event removed successfully" });
};

exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid Event ID");

      const event = EventSchema.findById(id);
      if (!event) return sendError(res, "Event not found", 404);

      await EventSchema.findByIdAndDelete(id);
    }
  }
  res.json({ success: true, message: "Multiple Events Deleted" });
};

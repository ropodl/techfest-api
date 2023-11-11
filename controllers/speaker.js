const { isValidObjectId } = require("mongoose");
const SpeakerSchema = require("../models/speaker");
const { paginate } = require("../utils/paginate");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
  const { name, position, description, facebook, twitter, linkedin, status } =
    req.body;
  const { file } = req;

  let speakerImage = {
    url: (process.env.app_dev == "true" ? "http://" : "https://") + req.hostname + (process.env.app_dev == "true" ? `:${process.env.app_port}` : "") + "/" +file.path,
    name: file.filename,
  };

  const speaker = new SpeakerSchema({
    name,
    position,
    description,
    speakerImage,
    facebook,
    twitter,
    linkedin,
    status,
  });

  const { id } = await speaker.save();

  res.json({
    id,
    success: true,
    message: "Speaker add successfully",
  });
};

exports.update = async (req, res) => {
  const { name, position, description, facebook, twitter, linkedin, status } =
    req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Speaker ID not valid");

  const speaker = await SpeakerSchema.findById(id);
  if (!speaker) return sendError(res, "Speaker not found", 404);

  speaker.name = name;
  speaker.position = position;
  speaker.description = description;
  speaker.facebook = facebook;
  speaker.twitter = twitter;
  speaker.linkedin = linkedin;
  speaker.status = status;

  await speaker.save();

  res.json({ success: true, message: "Speaker updated successfully" });
};

exports.speaker = async (req, res) => {
  const { id } = req.params;

  const speaker = await SpeakerSchema.findOne({ _id: id });
  if (!speaker)
    return sendError(res, "Invalid request, Speaker not found", 404);

  const {
    _id,
    name,
    position,
    description,
    speakerImage,
    status,
    facebook,
    twitter,
    linkedin,
  } = speaker;

  res.json({
    id: _id,
    name,
    position,
    description,
    speakerImage,
    status,
    facebook,
    twitter,
    linkedin,
  });
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedSpeaker = await paginate(
    SpeakerSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const speakers = paginatedSpeaker.documents.map(
    ({
      id,
      speakerImage,
      name,
      position,
      description,
      facebook,
      twitter,
      linkedin,
      status,
    }) => {
      return {
        id,
        speakerImage,
        name,
        position,
        description,
        facebook,
        twitter,
        linkedin,
        status,
      };
    }
  );
  res.json({ speakers, pagination: paginatedSpeaker.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Speaker ID");

  const speaker = SpeakerSchema.findById(id);
  if (!speaker) return sendError(res, "Speaker not found", 404);

  await SpeakerSchema.findByIdAndDelete(id);

  res.json({ success: true, message: "Speaker removed successfully" });
};

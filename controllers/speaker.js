const SpeakerSchema = require("../models/speaker");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
  const { name, position, description } = req.body;
  const { file } = req;

  let speakerImage = {
    url: (process.env.app_dev ? "http://" : "https://") + req.hostname + (process.env.app_port ? `:${process.env.app_port}` : '') + "/" + file.path,
    name: file.filename
  }

  const speaker = new SpeakerSchema({ name, position, description, speakerImage });

  await speaker.save();

  res.json({
    success: true,
    speaker: {
      name, position, description, speakerImage
    }
  })
};

exports.update = async (req, res) => {
  const { name, position, description } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Speaker ID not valid");

  const speaker = await SpeakerSchema.findById(id);
  if (!blog) return sendError(res, "Speaker not found", 404);

  speaker.name = name;
  speaker.position = position;
  speaker.description = description;

  await blog.save();

  res.json({ success: true, message: "Speaker updated successfully" });
};

exports.all = async (req, res) => {
  const itemsPerPage = parseInt(req.query.per_page) === -1 ? 0 : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedSpeaker = await paginate(SpeakerSchema, page, itemsPerPage)

  const speakers = paginatedSpeaker.documents.map(({ id, speakerImage, name, position, description }) => {
    return { id, speakerImage, name, position, description }
  })
  res.json({ speakers, pagination: paginatedSpeaker.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Speaker ID")

  const speaker = SpeakerSchema.findById(id)
  if (!speaker) return sendError(res, "Speaker not found", 404);

  await SpeakerSchema.findByIdAndDelete(id)

  res.json({ message: "Speaker removed successfully" });
}
const PrizeSchema = require("../../models/prize");
const SpeakerSchema = require("../../models/speaker");
const WorkshopSchema = require("../../models/workshop");
const { paginate } = require("../../utils/paginate");

exports.home = async (req, res) => {
  // Prizes
  const paginatedPrize = await paginate(
    PrizeSchema,
    1,
    4,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const prizes = await Promise.all(
    paginatedPrize.documents.map(async (prize) => {
      const { id, title, prizeImage, description } = prize;
      return {
        id,
        title,
        prizeImage,
        description,
      };
    })
  );
  // Speakers
  const paginatedSpeakers = await paginate(
    SpeakerSchema,
    1,
    4,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const speakers = await Promise.all(
    paginatedSpeakers.documents.map(async (speaker) => {
      const {
        id,
        name,
        position,
        description,
        speakerImage,
        facebook,
        twitter,
      } = speaker;
      return {
        id,
        name,
        position,
        description,
        speakerImage,
        facebook,
        twitter,
      };
    })
  );
  res.json({ prizes, speakers });
};

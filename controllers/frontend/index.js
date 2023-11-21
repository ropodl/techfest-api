const PrizeSchema = require("../../models/prize");
const SpeakerSchema = require("../../models/speaker");
const SponsorLevelSchema = require("../../models/level");
const SponsorSchema = require("../../models/sponsor");
const { paginate } = require("../../utils/paginate");

exports.home = async (req, res) => {
  // Prizes
  const paginatedPrize = await paginate(
    PrizeSchema,
    1,
    0,
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
    0,
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
        linkedin,
      } = speaker;
      return {
        id,
        name,
        position,
        description,
        speakerImage,
        facebook,
        twitter,
        linkedin,
      };
    })
  );
  // Sponsors Levels
  const paginatedLevels = await paginate(
    SponsorLevelSchema,
    1,
    0,
    { status: "Published" },
    { priority: "1" }
  );
  const levels = await Promise.all(
    paginatedLevels.documents.map(async (item) => {
      const count = await SponsorSchema.countDocuments({ level: item });
      const { title, priority } = item;
      return { title, priority, count };
    })
  );
  // Sponsors
  const paginatedSponsors = await paginate(
    SponsorSchema,
    1,
    0,
    { status: "Published" },
    { createdAt: "-1" }
  );
  const sponsors = await Promise.all(
    paginatedSponsors.documents.map(async (sponsor) => {
      await sponsor.populate({ path: "level", select: "title level" });
      const { name, sponsorImage, level, link, description } = sponsor;
      return { name, sponsorImage, level, link, description };
    })
  );
  // Response
  res.json({ prizes, speakers, levels, sponsors });
};

const SpeakerSchema = require("../../models/speaker");
const WorkshopSchema = require("../../models/workshop");
const { paginate } = require("../../utils/paginate");

exports.home = async (req, res) => {
    const paginatedSpeakers = await paginate(SpeakerSchema, 1, 4, {}, { createdAt: '-1' });

    const speakers = await Promise.all(paginatedSpeakers.documents.map(async (speaker) => {
        const { id, name, position, description, speakerImage, status, facebook, twitter } = speaker;
        return {
            id, name, position, description, speakerImage, status, facebook, twitter
        };
    }))
    res.json({ speakers })
};

exports.workshop = async (req, res) => {
    const workshops = await WorkshopSchema.find({});
    res.json(workshops);
};
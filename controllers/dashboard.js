const BlogSchema = require("../models/blog");
const SpeakerSchema = require("../models/speaker");
const SponsorSchema = require("../models/sponsor");
const contactRequestSchema = require("../models/contactRequest");

exports.dashboard = async (req, res) => {
	const blogCount = await BlogSchema.countDocuments();
	const speakerCount = await SpeakerSchema.countDocuments();
	const sponsorCount = await SponsorSchema.countDocuments();
	const contactRequestCount = await contactRequestSchema.countDocuments();
	res.json({
		counter: [{
			title: "Total Blogs",
			number: blogCount,
			icon: "mdi:newspaper",
			color: "primary"
		}, {
			title: "Total Speakers",
			number: speakerCount,
			icon: "mdi:account-tie",
			color: "warning"
		}, {
			title: "Total Sponsors",
			number: sponsorCount,
			icon: "mdi:money",
			color: "success"
		}, {
			title: "Total Contact Request",
			number: contactRequestCount,
			icon: "mdi:phone",
			color: "error"
		}]
	})
}
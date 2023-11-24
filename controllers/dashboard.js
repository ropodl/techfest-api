const BlogSchema = require("../models/blog");
const WorkshopSchema = require("../models/workshop");
const EventSchema = require("../models/event");
const SpeakerSchema = require("../models/speaker");
const SponsorSchema = require("../models/sponsor");
const contactRequestSchema = require("../models/contactRequest");
const { paginate } = require("../utils/paginate");

exports.dashboard = async (req, res) => {
  const blogCount = await BlogSchema.countDocuments();
  const speakerCount = await SpeakerSchema.countDocuments();
  const sponsorCount = await SponsorSchema.countDocuments();
  const contactRequestCount = await contactRequestSchema.countDocuments();

  // Counter Widget
  const counter = [
    {
      title: "Total Blogs",
      number: blogCount,
      icon: "mdi:newspaper",
      color: "primary",
    },
    {
      title: "Total Speakers",
      number: speakerCount,
      icon: "mdi:account-tie",
      color: "warning",
    },
    {
      title: "Total Sponsors",
      number: sponsorCount,
      icon: "mdi:money",
      color: "success",
    },
    {
      title: "Total Contact Request",
      number: contactRequestCount,
      icon: "mdi:phone",
      color: "error",
    },
  ];
  //   Blogs Widget
  const paginatedBlog = await paginate(
    BlogSchema,
    1,
    3,
    {},
    { createdAt: "-1" }
  );
  const blogs = await Promise.all(
    paginatedBlog.documents.map(async (blog) => {
      const { id, title, slug, featuredImage, createdAt } = blog;
      return {
        id,
        title,
        slug,
        featuredImage,
        createdAt,
      };
    })
  );
  //   Pre-Event Widget
  const paginatedEvent = await paginate(
    EventSchema,
    1,
    3,
    {},
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
  //   workshop Widget
  const paginatedWorkshop = await paginate(
    WorkshopSchema,
    1,
    3,
    {},
    { createdAt: "-1" }
  );
  const workshops = await Promise.all(
    paginatedWorkshop.documents.map(async (workshop) => {
      const { id, title, workshopImage } = workshop;
      return {
        id,
        title,
        workshopImage,
      };
    })
  );

  res.json({
    counter,
    blogs,
    events,
    workshops,
  });
};

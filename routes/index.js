const express = require("express");

const dashboardRoute = require("./dashboard");
const adminRoute = require("./admin");
const blogRoute = require("./blog");
const speakerRoute = require("./speaker");
const termsRoute = require("./terms");
const privacyRoute = require("./privacy");
const contactRequestRoute = require("./contactRequest");
const resourceRoute = require("./resource");
const teamRoute = require("./team");
const roleRoute = require("./role");
const sponsorRoute = require("./sponsor");
const sponsorLevelRoute = require("./level");
const workshopRoute = require("./workshop");
const eventRoute = require("./event");
const prizeRoute = require("./prize");
const faqRoute = require("./faq");

const frontendRoute = require("./frontend");

const router = express.Router();

// Frontend Routes
router.use("/frontend", frontendRoute);

// User End Routes

// Admin/Dashboard End Routes

// Both End
router.use("/dashboard", dashboardRoute);
router.use("/login", adminRoute);
router.use("/blog", blogRoute);
router.use("/speaker", speakerRoute);
router.use("/terms", termsRoute);
router.use("/privacy", privacyRoute);
router.use("/contact-request", contactRequestRoute);
router.use("/resource", resourceRoute);
router.use("/team", teamRoute);
router.use("/role", roleRoute);
router.use("/sponsor", sponsorRoute);
router.use("/sponsor-level", sponsorLevelRoute);
router.use("/workshop", workshopRoute);
router.use("/event", eventRoute);
router.use("/prize", prizeRoute);
router.use("/faq", faqRoute);

module.exports = router;

const express = require("express")

const homeRoute = require("./home")
const adminRoute = require("./admin")
const blogRoute = require("./blog")
const categoryRoute = require("./category")
const speakerRoute = require("./speaker")
const termsRoute = require("./terms")
const contactRequestRoute = require("./contactRequest")
const resourceRoute = require("./resource")
const teamRoute = require("./team")

const frontendRoute = require("./frontend")

const router = express.Router();

// Frontend Routes
router.use("/", frontendRoute);

// User End Routes

// Admin/Dashboard End Routes

// Both End
router.use("/home", homeRoute);
router.use("/login", adminRoute);
router.use("/blog", blogRoute);
router.use("/category", categoryRoute);
router.use("/speaker", speakerRoute);
router.use("/terms", termsRoute);
router.use("/contact-request", contactRequestRoute);
router.use("/resource", resourceRoute);
router.use("/team", teamRoute);

module.exports = router;

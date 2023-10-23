const express = require("express")

const homeRoute = require("./home")
const userRoute = require("./user")
const blogRoute = require("./blog")
const categoryRoute = require("./category")
const speakerRoute = require("./speaker")
const termsRoute = require("./terms")
const contactRequestRoute = require("./contactRequest")
const resourceRoute = require("./resource")

const router = express.Router();

router.use("/", homeRoute);
router.use("/login", userRoute);
router.use("/blog", blogRoute);
router.use("/category", categoryRoute);
router.use("/speaker", speakerRoute);
router.use("/terms", termsRoute);
router.use("/contact-request", contactRequestRoute);
router.use("/resource", resourceRoute);

module.exports = router;

const express = require("express")

const userRoute = require("./user")
const blogRoute = require("./blog")
const categoryRoute = require("./category")
const tagRoute = require("./tag")
const homeRoute = require("./home")

const router = express.Router();

router.use("/login", userRoute);
router.use("/blog", blogRoute);
router.use("/category", categoryRoute);
router.use("/tag", tagRoute);
router.use("/", homeRoute);

module.exports = router;

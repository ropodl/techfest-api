const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { latest, create, remove, blog, all, search, removeBulk, update } = require("../controllers/blog");
const { uploadImage } = require("../middleware/multer");
const { slugify } = require('../utils/slugify');
const { blogValidator } = require("../middleware/validator/blog");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, blogValidator, validate, slugify, create);
router.post("/search", search)

router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, validate, slugify, update)

router.get("/latest", latest)
router.get("/", all)
router.get("/:slug", blog)

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk)
router.delete("/:id", isAuth, isAdmin, remove)

module.exports = router;

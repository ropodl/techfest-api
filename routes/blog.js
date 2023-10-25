const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, remove, blog, all, search, removeBulk, update } = require("../controllers/blog");
const { uploadImage } = require("../middleware/multer");

const { blogValidator } = require("../middleware/validator/blog");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, blogValidator, validate, create);
router.post("/search", search)

router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, validate, update)

// router.get("/latest", latest)
router.get("/", all)
router.get("/:slug", blog)

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk)
router.delete("/:id", isAuth, isAdmin, remove)

module.exports = router;

const express = require("express");

const { create, all, removeBulk, remove } = require("../controllers/contactRequest");
const { contactRequestValidator } = require("../middleware/validator/contactRequest")
const { validate } = require("../middleware/validator/validate")
const { isAuth,isAdmin } = require("../middleware/auth")

const router = express.Router();

router.post("/create", contactRequestValidator, validate, create);
// router.post("/search", search)

// router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, validate, slugify, update)

// router.get("/latest", latest)
router.get("/", all)
// router.get("/:slug", blog)

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk)
router.delete("/:id", isAuth, isAdmin, remove)

module.exports = router;

const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, remove, team, all, search, removeBulk, update } = require("../controllers/team");
const { uploadImage } = require("../middleware/multer");

const { teamValidator } = require("../middleware/validator/team");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, teamValidator, validate, create);
// router.post("/search", search)

router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, teamValidator, validate, update)

router.get("/", all);
router.get("/:id", team)

// router.delete("/delete-bulk", isAuth, isAdmin, removeBulk)
router.delete("/:id", isAuth, isAdmin, remove)

module.exports = router;

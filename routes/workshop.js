const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, remove, workshop, all, removeBulk, update } = require("../controllers/workshop");
const { uploadImage } = require("../middleware/multer");

const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, validate, create);

router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, validate, update);

router.get("/", all);
router.get("/:id", workshop);

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk);
router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

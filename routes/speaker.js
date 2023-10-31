const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, all, remove, speaker } = require("../controllers/speaker");
const { uploadImage } = require("../middleware/multer");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, create);

router.get("/", all);
router.get("/:id", speaker);

router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

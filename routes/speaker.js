const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, all, remove, speaker, update } = require("../controllers/speaker");
const { uploadImage } = require("../middleware/multer");

const router = express.Router();

router.post("/create", uploadImage.single("image"), isAuth, isAdmin, create);

router.patch("/:id", uploadImage.single("image"), isAuth, isAdmin, update)

router.get("/", all);
router.get("/:id", speaker);

router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

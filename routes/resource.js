const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, all } = require("../controllers/resource");
const { uploadImage } = require("../middleware/multer");

const router = express.Router();

router.post("/create", uploadImage.single("file"), isAuth, isAdmin, create);

router.get("/", all);

module.exports = router;
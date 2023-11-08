const express = require("express");

const {
  findOrCreate,
  registerWorkshop,
  isUserRes,
} = require("../controllers/frontend/user");
const { home } = require("../controllers/frontend");
const { workshop } = require("../controllers/frontend/workshop");
const { blog, blogs } = require("../controllers/frontend/blog");
const { members } = require("../controllers/frontend/member");

const { uploadImage } = require("../middleware/multer");
const { isUser } = require("../middleware/userAuth");

const router = express.Router();

router.get("/home", home);

router.get("/blog", blogs);
router.get("/blog/:slug", blog);

router.get("/workshop", workshop);

router.get("/team", members);

router.get("/user/is-user", isUser, isUserRes);

router.post("/user/find-or-create", uploadImage.single("image"), findOrCreate);
router.post("/register-workshop", registerWorkshop);

module.exports = router;

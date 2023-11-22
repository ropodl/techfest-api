const express = require("express");

const {
  findOrCreate,
  registerWorkshop,
  isUserRes,
} = require("../controllers/frontend/user");
const { home } = require("../controllers/frontend");
const { workshop, workshops } = require("../controllers/frontend/workshop");
const { blog, blogs } = require("../controllers/frontend/blog");
const { members } = require("../controllers/frontend/member");

const { uploadImage } = require("../middleware/multer");
const { isUser } = require("../middleware/userAuth");
const { faqs } = require("../controllers/frontend/faq");
const { event, events } = require("../controllers/frontend/event");

const router = express.Router();

router.get("/home", home);

router.get("/blog", blogs);
router.get("/blog/:slug", blog);
router.get("/event", events);
router.get("/event/:id", event);
router.get("/workshop", workshops);
router.get("/workshop/:id", workshop);
router.get("/team", members);
router.get("/faqs", faqs);

router.get("/user/is-user", isUser, isUserRes);

router.post("/user/find-or-create", uploadImage.single("image"), findOrCreate);
router.post("/register-workshop", registerWorkshop);

module.exports = router;

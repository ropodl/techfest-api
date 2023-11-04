const express = require("express")

const { findOrCreate, registerWorkshop } = require("../controllers/frontend/user")
const { home } = require("../controllers/frontend")
const { workshop } = require("../controllers/frontend/workshop");
const { blog, blogs } = require("../controllers/frontend/blog");

const router = express.Router();

router.get("/home", home);

router.get("/blog", blogs);
router.get("/blog/:slug", blog);

router.get("/workshop", workshop);

router.post('/user/find-or-create', findOrCreate);
router.post("/register-workshop", registerWorkshop);

module.exports = router;
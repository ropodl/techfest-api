const express = require("express")

const { findOrCreate } = require("../controllers/frontend/user")
const { home } = require("../controllers/frontend/home")

const router = express.Router();

router.get("/home", home)
// router.get("/blog", home)

router.post('/user/find-or-create', findOrCreate);

module.exports = router;
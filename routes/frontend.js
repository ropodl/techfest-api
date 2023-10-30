const express = require("express")

const { findOrCreate, home } = require("../controllers/frontend/user")

const router = express.Router();

router.get("/home", home)

router.post('/user/find-or-create', findOrCreate);

module.exports = router;
const express = require("express")

const { findOrCreate } = require("../controllers/frontend/user")

const router = express.Router();

router.post('/user/find-or-create', findOrCreate);

module.exports = router;
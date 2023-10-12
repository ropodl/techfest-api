const express = require('express');

const {isAuth,isAdmin} = require("../middleware/auth");
const {create,latest} = require("../controllers/tag");

const router = express.Router();

router.post("/create",isAuth,isAdmin,create);

router.get("/latest",latest);

module.exports = router;



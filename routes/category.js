const express = require('express');

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, latest, all } = require("../controllers/category");
const { categoryValidator } = require('../middleware/validator/category');
const { validate } = require('../middleware/validator/validate');

const router = express.Router();

router.post("/create", isAuth, isAdmin, categoryValidator, validate, create);

router.get("/latest", latest);
router.get("/", all);

module.exports = router;

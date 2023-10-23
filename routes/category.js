const express = require('express');

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, all, remove, removeBulk } = require("../controllers/category");
const { categoryValidator } = require('../middleware/validator/category');
const { validate } = require('../middleware/validator/validate');

const router = express.Router();

router.post("/create", isAuth, isAdmin, categoryValidator, validate, create);

router.get("/", all);

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk)
router.delete("/:id", isAuth, isAdmin, remove)

module.exports = router;

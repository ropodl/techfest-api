const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, remove, role, all, update } = require("../controllers/role");
const { roleValidator } = require("../middleware/validator/role");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", isAuth, isAdmin, roleValidator, validate, create);

router.patch("/:id", isAuth, isAdmin, roleValidator, validate, update);

router.get("/", all);
router.get("/:id", role);

router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

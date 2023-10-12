const express = require("express");

const { create, isAuthRes, login } = require("../controllers/user");
const { isAuth } = require("../middleware/auth");
const { signInValidator } = require("../middleware/validator/user");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.get("/create", create);
// IS USER AUTH
router.get("/is-auth", isAuth, isAuthRes);
router.post("/", signInValidator, validate, login);

module.exports = router;

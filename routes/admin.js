const express = require("express");

const {
  create,
  isAuthRes,
  login,
  userMigration,
} = require("../controllers/admin");
const { isAuth, isAdmin } = require("../middleware/auth");
const { signInValidator } = require("../middleware/validator/admin");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.get("/create", isAuth, isAdmin, create);
router.get("/user-migration", userMigration);
// IS USER AUTH
router.get("/is-auth", isAuth, isAuthRes);
router.post("/", signInValidator, validate, login);

module.exports = router;

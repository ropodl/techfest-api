const express = require("express");

const {
  create,
  isAuthRes,
  login,
  userMigration,
  all,
  remove,
} = require("../controllers/admin");
const { isAuth, isAdmin } = require("../middleware/auth");
const { signInValidator } = require("../middleware/validator/admin");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.get("/", isAuth, isAdmin, all);
router.get("/is-auth", isAuth, isAuthRes);
router.get("/user-migration", userMigration);

router.post("/create", isAuth, isAdmin, create);
router.post("/", signInValidator, validate, login);

router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

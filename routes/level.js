const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const {
  create,
  remove,
  all,
  update,
  sponsorLevel,
} = require("../controllers/level");
const {
  sponsorLevelValidator,
} = require("../middleware/validator/level");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  sponsorLevelValidator,
  validate,
  create
);
// router.post("/search", search)

router.patch("/:id", isAuth, isAdmin, update);

router.get("/", all);
router.get("/:slug", sponsorLevel);

// router.delete("/delete-bulk", isAuth, isAdmin, removeBulk);
router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const {
  create,
  remove,
  event,
  all,
  removeBulk,
  update,
} = require("../controllers/event");
const { uploadImage } = require("../middleware/multer");

const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post(
  "/create",
  uploadImage.single("image"),
  isAuth,
  isAdmin,
  validate,
  create
);

router.patch(
  "/:id",
  uploadImage.single("image"),
  isAuth,
  isAdmin,
  validate,
  update
);

router.get("/", all);
router.get("/:id", event);

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk);
router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

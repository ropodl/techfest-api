const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const {
  create,
  remove,
  all,
  update,
  faq,
  removeBulk,
} = require("../controllers/faq");

const router = express.Router();

router.post("/create", isAuth, isAdmin, create);
// router.post("/search", search)

router.patch("/:id", isAuth, isAdmin, update);

router.get("/", all);
router.get("/:id", faq);

router.delete("/delete-bulk", isAuth, isAdmin, removeBulk);
router.delete("/:id", isAuth, isAdmin, remove);

module.exports = router;

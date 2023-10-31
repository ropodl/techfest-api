const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { get, update, create } = require("../controllers/privacy");

const router = express.Router();

router.get("/", get);

router.post("/create", isAuth, isAdmin, create);

router.patch("/update", isAuth, isAdmin, update);

module.exports = router;

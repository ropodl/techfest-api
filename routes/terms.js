const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, update, terms } = require("../controllers/terms");

const router = express.Router();

router.post("/create", isAuth, isAdmin, create);

router.patch("/", isAuth, isAdmin, update)

router.get("/", terms)

module.exports = router;

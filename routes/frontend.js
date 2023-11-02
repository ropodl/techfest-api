const express = require("express")

const { findOrCreate, registerWorkshop } = require("../controllers/frontend/user")
const { home, workshop } = require("../controllers/frontend")

const router = express.Router();

router.get("/home", home);
router.get("/workshop", workshop);

router.post('/user/find-or-create', findOrCreate);
router.post("/register-workshop", registerWorkshop);

module.exports = router;
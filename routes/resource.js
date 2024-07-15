const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { create, all, update, delete: deleteResource, getById } = require("../controllers/resource");
const { uploadDocument } = require("../middleware/multer");

const router = express.Router();

router.post("/create", uploadDocument.single("file"), isAuth, isAdmin, create);
router.get("/", all);
router.get("/:id", isAuth, getById); // Route to get resource by ID
router.put("/:id", uploadDocument.single("file"), isAuth, isAdmin, update);
router.delete("/:id", isAuth, isAdmin, deleteResource);

module.exports = router;

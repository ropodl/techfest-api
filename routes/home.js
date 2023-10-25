const express = require('express');

const { home } = require('../controllers/home');

const router = express.Router();

// router.get("/", frontHome);
router.get("/blog", home);

module.exports = router;
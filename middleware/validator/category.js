const { check } = require("express-validator");

exports.categoryValidator = [
    check("title").trim().notEmpty().withMessage("Title is missing"),
]
const { check } = require("express-validator");

exports.blogValidator = [
    check("title").trim().notEmpty().withMessage("Title is missing"),
    check("content").trim().notEmpty().withMessage("Content is missing"),
    check("excerpt").trim().notEmpty().withMessage("Excerpt is missing"),
    check("status")
        .isIn(["Draft", "Published"])
        .withMessage("Status must be private or public")
]
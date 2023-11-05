const { check } = require("express-validator");

exports.roleValidator = [
  check("title").trim().notEmpty().withMessage("Title is missing"),
  check("level")
    .trim()
    .notEmpty()
    .withMessage("Role Priority Level is missing")
    .isNumeric({ min: 1 })
    .withMessage("Role Priority Level must be a number greater than 0"),
  check("status")
    .isIn(["Draft", "Published"])
    .withMessage("Status must be Draft or Published"),
];

const { check } = require("express-validator");

exports.sponsorLevelValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Sponsor Level title is missing")
    .isLength({ min: 3 })
    .withMessage("Minimum title length must be 3"),
  check("level")
    .trim()
    .notEmpty()
    .withMessage("Sponsor Level Priority Number is missing")
    .isNumeric()
    .withMessage("Sponsor Level Priority Number is a number"),
  check("status")
    .isIn(["Draft", "Published"])
    .withMessage("Status must be draft or published"),
];

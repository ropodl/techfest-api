const { check } = require("express-validator");

exports.teamValidator = [
    check("name").trim().notEmpty().withMessage("Name is missing").isLength({ min: 3 }).withMessage("Minimum name length must be 3"),
    check("email").trim().notEmpty().withMessage("Email is missing").normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("phone").trim().isLength({ min: 7, max: 10 }).withMessage("Phone Number must be between 7 to 10 digits").optional(),
    check("role").trim().notEmpty().withMessage("Role is missing"),
    check("leader").isBoolean().withMessage("Leader is true or false field"),
    check("status")
        .isIn(["Draft", "Published"])
        .withMessage("Status must be draft or published")
]
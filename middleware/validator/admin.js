const { check } = require("express-validator");

exports.signInValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("password").trim().notEmpty().withMessage("Password is Missing"),
];

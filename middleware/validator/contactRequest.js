const { check } = require("express-validator");

exports.contactRequestValidator = [
    check('name').trim().notEmpty().withMessage('Name is missing'),
    check('phone').trim().notEmpty().withMessage("Phone Number is missing").isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits long'),
    check('email').trim().isEmail().withMessage('Invalid email address'),
    check('subject').trim().notEmpty().withMessage('Subject is missing'),
    check('message').trim().notEmpty().withMessage('Message is missing'),
]
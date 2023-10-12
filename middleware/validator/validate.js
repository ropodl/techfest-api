const { validationResult } = require("express-validator");
const { sendError } = require("../../utils/error");

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        sendError(res, error, 400);
    }
    next();
};

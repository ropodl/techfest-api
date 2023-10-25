const jwt = require("jsonwebtoken");

const AdminSchema = require("../models/admin");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
    const oldUser = await AdminSchema.findOne({ email: "sarox14@gmail.com" });
    if (oldUser) return sendError(res, "Path Not Found", 404);
    const user = new AdminSchema({ name: "Saroj Poudel", email: "sarox14@gmail.com", password: process.env.admin_pass, role: "admin" });
    await user.save();

    res.status(200).json(
        {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        }
    )
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await AdminSchema.findOne({ email });
    if (!user) return sendError(res, "Email/Password do not match");

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email/Password do not match");

    const { id, name, role } = user;

    const token = jwt.sign({ userId: user._id }, process.env.app_jwt_secret
        //, {
        //    expiresIn: "1d",
        //}
    );

    res.json({
        success: true,
        token,
        user: {
            id,
            name,
            email,
            role,
        },
    });
}

exports.isAuthRes = async (req, res) => {
    const { user } = req;
    const { id, name, email, role } = user;
    res.json({
        user: {
            id, name, email, role
        }
    });
}

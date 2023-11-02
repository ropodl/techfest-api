const jwt = require("jsonwebtoken");
const { sendError } = require("../../utils/error");

const UserSchema = require("../../models/user");
const { isValidObjectId } = require("mongoose");

exports.findOrCreate = async (req, res) => {
    const { name, email, image } = req.body;

    const oldUser = await UserSchema.findOne({ email }).populate({ path: "workshops", select: "id title workshopImage" });
    // if user already exists send token and user info
    if (oldUser) {
        const token = jwt.sign({ userId: oldUser._id }, process.env.app_jwt_secret);
        return res.json({ token, user: oldUser })
    }
    // if new user then create user and send token
    const user = new UserSchema({ name, email, image });
    const { id } = await user.save();
    const token = jwt.sign({ userId: id }, process.env.app_jwt_secret);
    return res.json({ token, user: { id, name, email, image } })
};

exports.registerWorkshop = async (req, res) => {
    const { workshopId, email } = req.body;

    if (!isValidObjectId(workshopId))
        return sendError(res, "Invalid workshop");

    const user = await UserSchema.findOne({ email }).populate({ path: "workshops", select: "title workshopImage" });

    if (user.workshops) {
        for (let workshop in user.workshops) {
            if (user.workshops[workshop].id === workshopId) {
                return res.json({ success: false, message: "Already registered" })
            }
        }
    }

    user.workshops.push(workshopId);
    await user.save();

    res.json({ success: true, message: "Successfully applied, thank you for joining" });
}

exports.home = async (req, res) => {
    console.log(req);
    res.json({ message: "Test is test" })
}
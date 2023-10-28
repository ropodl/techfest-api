const jwt = require("jsonwebtoken");

const UserSchema = require("../../models/user");

exports.findOrCreate = async (req, res) => {
    const { name, email, image } = req.body;

    const oldUser = await UserSchema.findOne({ email });
    // if user already exists send token and user info
    if (oldUser) {
        const token = jwt.sign({ userId: oldUser._id }, process.env.app_jwt_secret
            //, {
            //    expiresIn: "1d",
            //}
        );
        return res.json({ token, user: oldUser })
    }
    // if new user then create user and send token
    const user = new UserSchema({ name, email, image });
    const { id } = await user.save();
    const token = jwt.sign({ userId: id }, process.env.app_jwt_secret);
    return res.json({ token, user: { id, name, email, image } })
};
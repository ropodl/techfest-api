const jwt = require("jsonwebtoken");
const https = require("https");
const fs = require("fs");

const { sendError } = require("../../utils/error");

const UserSchema = require("../../models/user");
const { isValidObjectId } = require("mongoose");

exports.findOrCreate = async (req, res) => {
  const { name, email, image } = req.body;
  // console.log(req);

  const oldUser = await UserSchema.findOne({ email }).populate({
    path: "workshops",
    select: "id title workshopImage",
  });
  // if user already exists send token and user info
  if (oldUser) {
    const token = jwt.sign({ userId: oldUser._id }, process.env.app_jwt_secret);
    return res.json({
      token,
      user: {
        id: oldUser.id,
        name: oldUser.name,
        email: oldUser.email,
        userImage: oldUser.userImage,
        workshops: oldUser.workshops,
      },
    });
  }
  // Store image
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const destinationPath = `uploads/media/${year}/${month}/${day}`;

  // Ensure the directory exists
  fs.mkdirSync(destinationPath, { recursive: true });

  // Generate the file name and path
  console.log(name);
  const fileName = name.toLowerCase().replace(/\s/g, "-") + ".jpg"; // Assuming .jpg for simplicity
  const filePath = `${destinationPath}/${fileName}`;

  function downloadImage(url, filePath, callback) {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(callback); // Call the callback function once the file is saved
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath); // Delete the file if there's an error
        callback(err.message);
      });
  }
  downloadImage(image, filePath);
  const userImage = {
    url:
      (process.env.app_dev ? "http://" : "https://") +
      req.hostname +
      (process.env.app_port ? `:${process.env.app_port}` : "") +
      "/" +
      filePath,
    name: fileName,
  };
  // if new user then create user and send token
  const user = new UserSchema({ name, email, userImage });
  const { id } = await user.save();
  const token = jwt.sign({ userId: id }, process.env.app_jwt_secret);
  return res.json({ token, user: { id, name, email, userImage, workshops } });
};

exports.isAuthRes = async (req, res) => {
  const { user } = req;
  const { id, name, email, role } = user;
  res.json({
    user: {
      id,
      name,
      email,
      role,
    },
  });
};

exports.registerWorkshop = async (req, res) => {
  const { workshopId, email } = req.body;

  if (!isValidObjectId(workshopId)) return sendError(res, "Invalid workshop");

  const user = await UserSchema.findOne({ email }).populate({
    path: "workshops",
    select: "title workshopImage",
  });

  if (user.workshops) {
    for (let workshop in user.workshops) {
      if (user.workshops[workshop].id === workshopId) {
        return res.json({ success: false, message: "Already registered" });
      }
    }
  }

  user.workshops.push(workshopId);
  await user.save();

  res.json({
    success: true,
    message: "Successfully applied, thank you for joining",
  });
};

exports.home = async (req, res) => {
  console.log(req);
  res.json({ message: "Test is test" });
};

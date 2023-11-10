const jwt = require("jsonwebtoken");

const AdminSchema = require("../models/admin");
const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  // test for now
  const { name, email, password } = req.body;
  //   TODO: add admin naturally
  // test for now
  const oldUser = await AdminSchema.findOne({ email });
  if (oldUser) return sendError(res, "Path Not Found", 404);
  const user = new AdminSchema({ name, email, password, role: "admin" });
  const { id } = await user.save();

  res.status(200).json({
    success: true,
    user: {
      id,
      name,
      email,
      role: "admin",
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminSchema.findOne({ email });
  if (!user) return sendError(res, "Email/Password do not match");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password do not match");

  const { id, name, role } = user;

  const token = jwt.sign(
    { userId: user._id },
    process.env.app_jwt_secret
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

exports.userMigration = async (req, res) => {
  const oldAdmin = await AdminSchema.findOne({});
  if (oldAdmin) return sendError(res, "Not Found", 404);

  const admin = new AdminSchema({
    name: "Admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
  });

  await admin.save();
  res.status(200).json("User Migration complete");
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedAdmin = await paginate(
    AdminSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const admins = paginatedAdmin.documents.map(({ id, name, email }) => {
    return { id, name, email };
  });
  res.json({ admins, pagination: paginatedAdmin.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Admin ID");

  const admin = AdminSchema.findById(id);
  if (!admin) return sendError(res, "Admin not found", 404);

  await AdminSchema.findByIdAndDelete(id);

  res.json({ message: "Admin removed successfully" });
};

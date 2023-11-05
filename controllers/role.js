const { isValidObjectId } = require("mongoose");

const RoleSchema = require("../models/role");

const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");

exports.create = async (req, res) => {
  const { title, level, status } = req.body;
  console.log(req.body);

  const role = new RoleSchema({
    title,
    level,
    status,
  });

  const { id } = await role.save();

  res.json({
    id,
    success: true,
    message: "Role added successfully",
  });
};

exports.update = async (req, res) => {
  const { title, level, status } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Role ID not valid", 404);

  const role = await RoleSchema.findById(id);
  if (!role) return sendError(res, "Role not found", 404);

  role.title = title;
  role.level = level;
  role.status = status;

  await role.save();

  res.json({
    success: true,
    message: "Role updated successfully",
  });
};

exports.role = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!isValidObjectId(id))
    return sendError(res, "Invalid request, Role not found", 404);

  const role = await RoleSchema.findById(id);
  if (!role) return sendError(res, "Invalid request, Role not found", 404);

  res.json(role);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedRole = await paginate(
    RoleSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const roles = await paginatedRole.documents.map((role) => {
    const { id, title, level, status, createdAt, updatedAt } = role;
    return {
      id,
      title,
      level,
      status,
      createdAt,
      updatedAt,
    };
  });

  res.json({ roles, pagination: paginatedRole.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return sendError(res, "Invalid request, Role not found", 404);

  const role = RoleSchema.findById(id);
  if (!role) return sendError(res, "Role not found", 404);

  await RoleSchema.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Role removed successfully",
  });
};

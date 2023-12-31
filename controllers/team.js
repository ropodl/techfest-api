const { isValidObjectId } = require("mongoose");

const TeamSchema = require("../models/team");

const { sendError } = require("../utils/error");
const { paginate } = require("../utils/paginate");
const { ImgUrl } = require("../utils/generateImgUrl");

exports.create = async (req, res) => {
  const { name, email, phone, role, leader, description, status } = req.body;
  const { file } = req;

  if (leader === "true") {
    const leaders = await TeamSchema.find({ leader: true }).populate({
      path: "role",
      select: "title",
    });
    for (item of leaders) {
      if (item.role.id === role) {
        return sendError(
          res,
          "Someone else already the leader in this role",
          400
        );
      }
    }
  }

  const memberImage = {
    url: ImgUrl(req, res, file),
    name: file.filename,
  };

  const member = new TeamSchema({
    name,
    email,
    phone,
    role,
    leader,
    description,
    memberImage,
    status,
  });

  await member.save();

  const { id } = member;

  res.json({
    id,
    success: true,
    message: "Team Member added successfully",
  });
};

exports.update = async (req, res) => {
  const { name, email, phone, role, description, leader, status } = req.body;
  const { id } = req.params;
  const { file } = req;

  if (!isValidObjectId(id))
    return sendError(res, "Team Member ID not valid", 404);

  const team = await TeamSchema.findById(id);
  if (!team) return sendError(res, "Team Member not found", 404);

  if (leader === "true") {
    const leaders = await TeamSchema.find({ leader: true }).populate({
      path: "role",
      select: "title",
    });
    for (item of leaders) {
      if (item.role.id === role) {
        return sendError(
          res,
          "Someone else already the leader in this role",
          400
        );
      }
    }
  }

  team.name = name;
  team.email = email;
  team.phone = phone;
  team.role = role;
  team.leader = leader;
  team.description = description;
  team.status = status;

  if (file)
    team.memberImage = {
      url: ImgUrl(req, res, file),
      name: file.filename,
    };

  await team.save();

  res.json({ success: true, message: "Team Member updated successfully" });
};

exports.team = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!isValidObjectId(id))
    return sendError(res, "Invalid request, Team Member not found", 404);

  const team = await TeamSchema.findById(id);
  if (!team)
    return sendError(res, "Invalid request, Team Member not found", 404);

  res.json(team);
};

exports.all = async (req, res) => {
  const itemsPerPage =
    parseInt(req.query.per_page) === -1
      ? 0
      : parseInt(req.query.per_page) || 10;
  const page = parseInt(req.query.page) || 0;

  const paginatedTeam = await paginate(
    TeamSchema,
    page,
    itemsPerPage,
    {},
    { createdAt: "-1" }
  );

  const teams = await Promise.all(
    paginatedTeam.documents.map(async (member) => {
      await member.populate({ path: "role", select: "title level" });
      const {
        id,
        memberImage,
        name,
        email,
        phone,
        role,
        leader,
        description,
        status,
        createdAt,
        updatedAt,
      } = member;
      return {
        id,
        memberImage,
        name,
        email,
        phone,
        role,
        leader,
        description,
        status,
        createdAt,
        updatedAt,
      };
    })
  );

  res.json({ teams, pagination: paginatedTeam.pagination });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Team Member ID");

  const team = TeamSchema.findById(id);
  if (!team) return sendError(res, "Team Member not found", 404);

  await TeamSchema.findByIdAndDelete(id);

  res.json({ success: true, message: "Team Member removed successfully" });
};

exports.removeBulk = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  if (ids) {
    for (id of ids) {
      if (!isValidObjectId(id)) return sendError(res, "Invalid Team Member ID");

      const team = TeamSchema.findById(id);
      if (!team) return sendError(res, "Team Member not found", 404);

      await TeamSchema.findByIdAndDelete(id);
    }
  }
  res.json({ message: "Multiple Team Member Deleted" });
};

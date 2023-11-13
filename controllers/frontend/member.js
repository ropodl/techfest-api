const TeamSchema = require("../../models/team");
const RoleSchema = require("../../models/role");
const { paginate } = require("../../utils/paginate");

exports.members = async (req, res) => {
  // Members
  const paginatedMembers = await paginate(
    TeamSchema,
    1,
    0,
    { status: "Published" },
    { role: "1", leader: "-1" }
  );
  const members = await Promise.all(
    paginatedMembers.documents.map(async (member) => {
      await member.populate({ path: "role", select: "title level" });
      const { id, memberImage, name, email, role, leader, description } =
        member;
      return {
        id,
        memberImage,
        name,
        email,
        role,
        leader,
        description,
      };
    })
  );
  //   Roles
  const paginatedRoles = await paginate(
    RoleSchema,
    1,
    0,
    { status: "Published" },
    { level: "1" }
  );

  const roles = await Promise.all(
    paginatedRoles.documents.map(async (role) => {
      const count = await TeamSchema.countDocuments({ role: role });
      const { id, title, level } = role;
      return {
        id,
        title,
        level,
        count,
      };
    })
  );
  res.json({ members, roles });
};

exports.blog = async (req, res) => {
  const { slug } = req.params;

  const blog = await TeamSchema.findOne({ slug }).populate({
    path: "categories",
    select: ["title slug"],
  });
  if (!blog) return sendError(res, "Invalid request, Blog not found", 404);

  const { title, excerpt, content, featuredImage, categories, createdAt } =
    blog;

  res.json({ title, excerpt, content, featuredImage, categories, createdAt });
};

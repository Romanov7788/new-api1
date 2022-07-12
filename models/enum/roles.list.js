const STATUS_TYPE_ADMIN = "Admin";
const STATUS_TYPE_USER= "User";

const enumRolesType = {
  type: String,
  enum: [STATUS_TYPE_ADMIN, STATUS_TYPE_USER ],
};

module.exports = { enumRolesType, STATUS_TYPE_USER, STATUS_TYPE_ADMIN };
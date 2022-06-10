const STATUS_TYPE_ACCEPTED = "Accept";
const STATUS_TYPE_PENDING = "Pending";
const STATUS_TYPE_REJECTED = "Rejected";

const enumStatusType = {
  type: String,
  enum: [STATUS_TYPE_REJECTED, STATUS_TYPE_PENDING, STATUS_TYPE_ACCEPTED],
};

module.exports = { enumStatusType, STATUS_TYPE_REJECTED, STATUS_TYPE_PENDING, STATUS_TYPE_ACCEPTED };

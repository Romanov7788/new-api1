module.exports = class UserDto {
  email;
  Id;
  roles;
  constructor(model) {
    this.email = model.email;
    this.Id = model.id;
    this.roles = model.roles;
  }
};

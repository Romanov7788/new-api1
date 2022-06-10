module.exports = class UserDto {
  email;
  Id;
  constructor(model) {
    this.email = model.email;
    this.Id = model.id;
  }
};

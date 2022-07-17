const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");
const Role = require("../models/Role");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const userRole = await Role.findOne({value: "User"})
    const user = await UserModel.create({ email, password: hashPassword, roles: [userRole.value] });
    const tokens = tokenService.generateTokens({user});
    await tokenService.saveToken(user, tokens.refreshToken);

    return { ...tokens, user };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("пользователь с таким Email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("неверный пароль");
    }
    const tokens = tokenService.generateTokens({ user, roles: user.roles });

    await tokenService.saveToken(user, tokens.refreshToken);
    return { ...tokens, user };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const tokens = tokenService.generateTokens({ user });
    await tokenService.saveToken(user, tokens.refreshToken);
    return { ...tokens, user };
  }

  async getAllUser() {
    const users = await UserModel.find({}, { password: 0 });
    return users;
  }
}

module.exports = new UserService();

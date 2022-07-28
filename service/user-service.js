const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");
const Role = require("../models/Role");
const config = require("../config");
const jwt = require("jsonwebtoken");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    
    const userRole = await Role.findOne({ value: "User" });
    const user = await UserModel.create({
      email,
      password: hashPassword,
      roles: [userRole.value],
    });
    const token = jwt.sign(
      { id: user.id, roles: user.roles, email: user.email },
      config.JWT_ACCESS_KEY,
      { expiresIn: "30m" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
    };
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
    const token = jwt.sign(
      { id: user.id, roles: user.roles, email: user.email },
      config.JWT_ACCESS_KEY,
      { expiresIn: "30m" }
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async getMe(token) {
    const userData = jwt.verify(token, config.JWT_ACCESS_KEY);
    const user = await UserModel.findOne(userData);
    console.log("userData", user);
    return user;
  }
}

module.exports = new UserService();

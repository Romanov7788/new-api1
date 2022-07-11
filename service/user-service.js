const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");
const UserDto = require("../user-dto");
const {STATUS_TYPE_USER, STATUS_TYPE_ADMIN} = require("../models/enum/roles.list");


class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({ roles: STATUS_TYPE_USER, email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
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
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
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
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUser() {
    const users = await UserModel.find({}, { password: 0 });
    return users;
  }

  // async getAllUser() {
  //   const users = tokenService.validateRefreshToken(refreshToken);
  //   if(users) {
  //     return{
  //       statusCode: 200,
  //       body: users.json({id: users.userId}),
  //     };
  //   } else {
  //     return {
  //       statusCode: 401,
  //       body: JSON.stringify({ msg: 'Invalid Authorization token' })
  //     };
  //   }
  // }

  async getCurrentUser() {
    const tokenFromDb = await tokenService.findToken(refreshToken);
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (userData || toke){
      return{
        statusCode:200,
        body:JSON.stringify({ _id: userData.id })
      };
    }

    return user;
  }
}

module.exports = new UserService();

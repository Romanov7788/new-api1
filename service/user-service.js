const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email });  //проверяем нет ли в базе данных таких эмейлов
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3); // шифрование пароля

    const user = await UserModel.create({  //сохраняеться захешированый пароль
      email,
      password: hashPassword,
      name,
    });

    return user;
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

    return user;
  }

  async logout() {
    return;
  }

  async getAllUser() {
    const users = await UserModel.find({}, { password: 0 });
    return users;
  }

}

module.exports = new UserService();

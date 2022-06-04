const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("ошибка при валидации", errors.array())
        );
      }
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, password, name);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {}
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUser();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserOne(req, res, next) {
    try {
      const { id } = req.params;
      const users = await UserModel.findById(id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();

const userService = require("../service/user-service");
const { check, validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
const Role = require("../models/Role");

class UserController {
  async registration(req, res, next) {
    try {
      [
      check ("email").isEmail(),
      check("password").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]){8,}/),
    ]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "login or password is incorrect! Try again",
            errors.array()
          )
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("token", userData.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData.user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("token", userData.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
      });
      return res.json(userData.user);
    } catch (e) {
      next(e);
    }
  }
  
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  
  async refresh(req, res, next) {
    // console.log("userDataref", req, res, next);
    try {
      // const { refreshToken } = req.cookies;
      // const userData = await userService.refresh(refreshToken);
      // res.cookie("refreshToken", userData.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
      // return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    // console.log('getUsers', req);
    try {
      const users = await UserModel.find();
      res.json(users);
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

  async getMe(req, res, next) {
    try {
      const { token } = req.cookies;
      console.log("req", token);
      const user = await userService.getMe(token);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();

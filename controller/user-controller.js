const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
const FriendShipService = require("../service/friendship-service");
const acceptFriendService = require("../service/acceptFriends-service");
const rejectedFriendService = require("../service/rejectedfriends-service");

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

  async addFriends(req, res, next) {
    try {
      const { friendsId, myId } = req.body;
      const userData = await FriendShipService.addFriends(friendsId, myId);
      return res.json({
        status: "success",
        message: "Friend request has been sent.",
      });
    } catch (e) {
      next(e);
    }
  }

  async rejectedFriends(req, res, next) {
    try {
      const { friendsId, myId } = req.body;
      const userData = await rejectedFriendService.rejectedFriends(
        friendsId,
        myId
      );
      return res.json({
        status: "success",
        message: "Friend rejected.",
      });
    } catch (e) {}
  }

  async acceptFriends(req, res, next) {
    try {
      const { friendsId, myId } = req.body;
      const userData = await acceptFriendService.acceptFriends(
        friendsId,
        myId
      );
      return res.json({
        status: "success",
        message: "Friend accepted.",
      });
    } catch (e) {}
  }
}

module.exports = new UserController();

const userController = require("../controller/user-controller");
const UserModel = require("../models/user-model");

class FriendShipService {
  async addFriends(friendsId, myId, name) {
    UserModel.updateOne(
      {
        _id: friendsId,
      },
      {
        $push: {
          incomingRequests: {
            _id: myId,
            status: "Pending",
          },
        },
      },
      function () {
        UserModel.updateOne(
          {
            _id: myId,
          },
          {
            $push: {
              outcomingRequests: {
                _id: friendsId,
                status: "Pending",
              },
            },
          },
          function () {} // не понимаю, без этой пустой функции не записывает в outcomingRequests результат
        );
      }
    );
  }
}

module.exports = new FriendShipService();

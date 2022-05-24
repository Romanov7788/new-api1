const UserModel = require("../models/user-model");

class FriendShipService {
  async acceptFriends(friendsId, myId) {
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
          }
        );
      },
      function () {
        res.json({
          status: "success",
        });
      }
    );
  }
}

module.exports = new FriendShipService();

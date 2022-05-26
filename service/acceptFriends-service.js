const UserModel = require("../models/user-model");

class acceptFriendService {
  async acceptFriends(friendsId, myId) {
    UserModel.updateMany(
      {
        _id: friendsId,
      },
      {
        $unset: {
          incomingRequests: {
            _id: myId,
            status: "Pending",
          },
        },
      },
      function () {
        UserModel.updateMany(
          {
            _id: myId,
          },
          {
            $unset: {
              outcomingRequests: {
                _id: friendsId,
                status: "Pending",
              },
            },
          },
          function () {
            UserModel.updateOne(
              {
                _id: friendsId,
              },
              {
                $push: {
                  friends: {
                    _id: myId,
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
                      friends: {
                        _id: friendsId,
                      },
                    },
                  },
                  function () {} // не понимаю, без этой пустой функции не записывает в outcomingRequests результат
                );
              }
            );
          }
        );
      }
    );
  }
}

module.exports = new acceptFriendService();

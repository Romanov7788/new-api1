const UserModel = require("../models/user-model");

class rejectedFriendService {
  async rejectedFriends(friendsId, myId) {
    UserModel.updateMany(
      {
        _id: friendsId,
      },
      {
        $unset: {
          incomingRequests: {
            _id: myId,
            status: "Rejected",
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
                status: "Rejected",
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
                  rejectedRequests: {
                    _id: myId,
                    status: "Rejected",
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
                      rejectedRequests: {
                        _id: friendsId,
                        status: "Rejected",
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

module.exports = new rejectedFriendService();

const UserModel = require("../models/user-model");

class FriendShipService {
  async addFriends(friendsId, myId) {
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
module.exports = new FriendShipService();

const userModel = require("../models/user-model");

class acceptFriendService {
  async acceptFriends(friendsId, myId) {
    userModel.updateOne(
      {
        _id: friendsId,
      },
      {
        $push: {
          rejectedRequests: {
            _id: friendsId,
            type: "friend_requst_accepted",
            content: "accepted your friend request",
          },
        },
      }
    );
    userModel.updateOne(
      {
        $and: [
          {
            _id: friendsId,
          },
          {
            "friend.friendsId": myId,
          },
        ],
      },
      {
        $set: {
          "friends.$.status": "Accepted",
        },
      },
      function (error, data) {
        userModel.updateOne(
          {
            $and: [
              {
                _id: myId,
              },
              {
                "friends.friendsId": myId,
              },
            ],
          },
          {
            $set: {
              "friends.$.status": "Accepted",
            },
          },
          function () {
            
          }
        );
      }
    );
  }
}

module.exports = new acceptFriendService();

const UserModel = require("../models/user-model");

class FriendShipService {
  async addFriends(friendsId, myId) {
    await UserModel.updateOne(
      { _id: friendsId },
      {
        $push: {
          incomingRequests: {
            _id: myId,
            status: "Pending",
          },
        },
      }
    );
    await UserModel.updateOne(
      { _id: myId },
      {
        $push: {
          outcomingRequests: {
            _id: friendsId,
            status: "Ptreyending",
          },
        },
      }
    );
  }

  async rejectedFriends(friendsId, myId) {
    await UserModel.updateMany(
      { _id: friendsId },
      {
        $unset: {
          incomingRequests: {
            _id: myId,
            status: "Rejected",
          },
        },
      }
    );
    await UserModel.updateMany(
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
      }
    );
    await UserModel.updateOne(
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
      }
    );
    await UserModel.updateOne(
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
      }
    );
  }

  async acceptFriends(friendsId, myId) {
    await UserModel.updateMany(
      { _id: friendsId },
      {
        $unset: {
          incomingRequests: {
            _id: myId,
            status: "Pending",
          },
        },
      }
    );
    await UserModel.updateMany(
      { _id: myId },
      {
        $unset: {
          outcomingRequests: {
            _id: friendsId,
            status: "Pending",
          },
        },
      }
    );
    await UserModel.updateOne(
      { _id: friendsId },
      {
        $push: {
          friends: {
            _id: myId,
          },
        },
      }
    );
    await UserModel.updateOne(
      { _id: myId },
      {
        $push: {
          friends: {
            _id: friendsId,
          },
        },
      }
    );
  }
}
module.exports = new FriendShipService();

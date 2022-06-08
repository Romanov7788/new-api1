const UserModel = require("../models/user-model");
const {STATUS_TYPE_REJECTED, STATUS_TYPE_PENDING, STATUS_TYPE_ACCEPTED} = require("../models/enum/status");

class FriendShipService {
  async addFriends(friendsId, myId) {
    await UserModel.updateOne(
      { _id: friendsId },
      {
        $push: {
          incomingRequests: {
            _id: myId,
            status: STATUS_TYPE_PENDING,
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
            status: STATUS_TYPE_PENDING,
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
            status: STATUS_TYPE_REJECTED,
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
            status: STATUS_TYPE_REJECTED,
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
            status: STATUS_TYPE_REJECTED,
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
            status: STATUS_TYPE_REJECTED,
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
            status: STATUS_TYPE_ACCEPTED,
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
            status: STATUS_TYPE_ACCEPTED,
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

// const jwt = require("jsonwebtoken");
// const tokenModel = require("../models/token-model");
// const config = require("../config");

// class tokenService {
//   generateTokens(payload) {
//     console.log("generating tokens", payload);
//     const accessToken = jwt.sign(payload, config.JWT_ACCESS_KEY, {
//       expiresIn: "30m",
//     });
    // const refreshToken = jwt.sign(payload, config.JWT_REFRESH_KEY, {
    //   expiresIn: "30h",
    // });
    // return {
      // accessToken,
      // refreshToken,
  //   };
  // }

  // validateAccessToken(token) {
  //   try {
  //     const userData = jwt.verify(token, config.JWT_ACCESS_KEY);
  //     return userData;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // validateRefreshToken(token) {
  //   try {
  //     const userData = jwt.verify(token, config.JWT_REFRESH_KEY);
  //     return userData;
  //   } catch (e) {
  //     return null;
  //   }
  // }

//   async saveToken(userId, accessToken) {
//     const tokenData = await tokenModel.findOne({ user: userId });
//     console.log("Saving token", tokenData);
//     if (tokenData) {
//       tokenData.accessToken = accessToken;
//       return tokenData.save();
//     }
//     const token = await tokenModel.create({ user: userId, accessToken });
//     return token;
//   }

//   async removeToken(accessToken) {
//     const tokenData = await tokenModel.deleteOne({ accessToken });
//     return tokenData;
//   }

//   async findToken(accessToken) {
//     const tokenData = await tokenModel.findOne({ accessToken });
//     return tokenData;
//   }
// }

// module.exports = new tokenService();

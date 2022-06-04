const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateToken(playload) {
    const accessToken = jwt.sign(playload, config.JWT_ACCESS_KEY, {
      expiresIn: "10m",
    });
    return {
      accessToken,
    };
  }

  async saveToken(userId) {
    const tokenData = await tokenModel.findOne({ user: userId });
    return tokenData.save();
  }
}

module.exports = new TokenService();

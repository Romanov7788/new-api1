const tokenService = require("../service/token-service");
const ApiError = require('../exceptions/api-error');
const config = require("../config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {    
  try {
    const authorizationHeader = req.headers.authorization; 
    if (!authorizationHeader) {

      return next(ApiError.UnauthorizedError());
    }
    
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
  
    const userData = jwt.verify(token, config.JWT_ACCESS_KEY);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData; 
    next(); 
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

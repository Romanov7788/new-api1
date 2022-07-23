const tokenService = require("../service/token-service");
const ApiError = require('../exceptions/api-error');
const config = require("../config");
const jwt = require("jsonwebtoken");


module.exports = function(roles) {
  return function(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization; 
      if (!authorizationHeader) {
        
        return next(ApiError.UnauthorizedError());
      }
      
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        return next(ApiError.UnauthorizedError());
      }
      const {roles: userRoles} = jwt.verify(token, config.JWT_ACCESS_KEY);     
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
            if (!hasRole) {
                return next(ApiError.NoAccessError());
            }        
            next(); 
          } catch (e) {
            return next(ApiError.NoAccessError());
        }
    }
};
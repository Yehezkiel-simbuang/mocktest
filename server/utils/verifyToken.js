const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errorHandler");
// const { request } = require("express");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "No token provided"));
  }
  jwt.verify(token, process.env.JWT_PASS, (error, user) => {
    if (error) return next(errorHandler(401, "Token incorrect"));
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };

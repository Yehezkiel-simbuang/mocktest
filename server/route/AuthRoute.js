const express = require("express");
const {
  loginMiddleware,
  registerMiddleware,
  logoutMiddleware,
} = require("../middleware/AuthMiddleware");
const authRouter = express.Router();

authRouter.post("/login", loginMiddleware);
authRouter.post("/register", registerMiddleware);
authRouter.get("/logout", logoutMiddleware);
module.exports = { authRouter };

const express = require("express");
const { verifyToken } = require("../utils/verifyToken");
const { updateMiddleware } = require("../middleware/UserMiddleware");
const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateMiddleware);

module.exports = { userRouter };

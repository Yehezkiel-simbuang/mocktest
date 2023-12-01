const express = require("express");
const {
  getUndoneTodo,
  createTodo,
  getDoneTodo,
  updateTodo,
  updateToDone,
  deleteTodo,
} = require("../middleware/TodoMiddleware");
const { verifyToken } = require("../utils/verifyToken");

const todoRouter = express.Router();

todoRouter.get("/solvedtask", verifyToken, getDoneTodo);
todoRouter.get("/unsolvedtask", verifyToken, getUndoneTodo);
todoRouter.post("/create", verifyToken, createTodo);
todoRouter.patch("/update/:id", verifyToken, updateTodo);
todoRouter.patch("/done/:id", verifyToken, updateToDone);
todoRouter.delete("/delete/:id", verifyToken, deleteTodo);
module.exports = { todoRouter };

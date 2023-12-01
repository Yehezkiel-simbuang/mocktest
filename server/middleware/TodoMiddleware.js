const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");
const prisma = new PrismaClient();

const getUndoneTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.findMany({
      where: {
        userId: +req.user.id,
        status: false,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getDoneTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.findMany({
      where: {
        userId: +req.user.id,
        status: true,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.create({
      data: {
        name: req.body.name,
        userId: +req.user.id,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json({ message: "Success create data", data: data });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.update({
      where: {
        id: +req.params.id,
        userId: +req.user.id,
      },
      data: {
        name: req.body.name,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json({ message: "Success update data", data: data });
  } catch (error) {
    next(error);
  }
};

const updateToDone = async (req, res, next) => {
  try {
    const data = await prisma.todo.update({
      where: {
        id: +req.params.id,
        userId: +req.user.id,
      },
      data: {
        status: true,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json({ message: "Job done", data: data });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const data = await prisma.todo.delete({
      where: {
        id: +req.params.id,
      },
    });
    if (!data) {
      return next(errorHandler(500, "Something went wrong"));
    }
    res.status(200).json({ message: "Delete success", data: data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUndoneTodo,
  createTodo,
  getDoneTodo,
  updateTodo,
  updateToDone,
  deleteTodo,
};

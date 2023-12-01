const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");
require("dotenv").config();
// response.cookie;
// response.clearCookie;
const prisma = new PrismaClient();
const loginMiddleware = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const isEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!isEmail) {
      return next(errorHandler(400, "Username or password incorrect"));
    }
    const encryptedPass = bcryptjs.compareSync(pass, isEmail.password);
    if (!encryptedPass) {
      return next(errorHandler(400, "Username or password incorrect"));
    }
    const { password, createdAt, updateAt, ...payload } = isEmail;
    const token = jwt.sign(payload, process.env.JWT_PASS, {
      expiresIn: "30m",
    });
    res
      .status(200)
      .cookie("access_token", token, { maxAge: 60000 * 30, httpOnly: true })
      .json(payload);
  } catch (error) {
    next(error);
  }
};
const registerMiddleware = async (req, res, next) => {
  try {
    const { name, email, pass } = req.body;
    const isUser = await prisma.user.findFirst({ where: { email: email } });
    if (isUser) {
      return next(errorHandler(500, "Email already used"));
    }
    const encryptedPass = bcryptjs.hashSync(pass, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: encryptedPass,
      },
    });
    if (!newUser) {
      return next(errorHandler(500, "Can't create account"));
    }
    res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const logoutMiddleware = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginMiddleware,
  registerMiddleware,
  logoutMiddleware,
};

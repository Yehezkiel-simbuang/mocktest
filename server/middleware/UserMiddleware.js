const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");

const prisma = new PrismaClient();
const updateMiddleware = async (req, res, next) => {
  if (req.params.id != req.user.id) {
    return next(errorHandler(401, "You have no right"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const userUpdate = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!userUpdate) {
      next(errorHandler(401, "Can't update"));
    }
    const { password, createdAt, updateAt, ...payload } = userUpdate;
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
module.exports = { updateMiddleware };

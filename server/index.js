const express = require("express");
const { authRouter } = require("./route/AuthRoute");
const { todoRouter } = require("./route/TodoRoute");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    sentry: res.sentry,
  });
});

app.listen(3000, () => {
  console.log("Listenting to port 3000....");
});

const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.message = message;
  error.statuscode = statusCode;
  return error;
};

module.exports = { errorHandler };

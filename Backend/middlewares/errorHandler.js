
const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};


const errorHandler = (err, req, res, next) => {
  const statuscode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  res.status(statuscode);
  res.json({
    status: "fail",
    message: err?.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: err?.stack } : {}),
  });
};

module.exports = { errorHandler, notFound };

module.exports = (req, res, next) => {
  res.locals.active = req.path.split("/")[1]; // [0] will be empty since routes start with '/'
  next();
};

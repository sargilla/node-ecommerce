const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mo = require("method-override");
const ses = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const sessionTimeMiddleware = require("./middlewares/sessionTimeMiddleware");
const menuMiddleware = require("./middlewares/menuMiddleware");

const app = express();

// .ENV
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mo("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  ses({ secret: "es un secreto", resave: false, saveUninitialized: true })
);

// esto es un middleware de tiempo de session
app.use(sessionMiddleware);
app.use(sessionTimeMiddleware);

app.use(menuMiddleware);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/users/", usersRouter);
app.use("/products/", productsRouter);
app.use("/api/", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render("errors/404");
  //next(createError(404));
});

// vista no encontrada
app.use(function (err, req, res, next) {
  console.log(err);
  if (err["view"] != null) {
    console.error("errorView", err.message);
    return res.render("errors/500");
  }
  return next();
});

// error handler
app.use(function (err, req, res, next) {
  console.log("errorHandler", err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

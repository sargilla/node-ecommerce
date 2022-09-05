const db = require("../database/models");
const Users = db.User;

sessionMiddleware = async (req, res, next) => {
  res.locals.userFound = false;
  let userFromCookie;

  if (req.session && req.session.userLogged) {
    res.locals.userFound = true;
    res.locals.userLogged = req.session.userLogged;
    if (req.session.userLogged.id === 1) {
      res.locals.userAdmin = true;
    }
  } else {
    if (req.cookies.userId) {
      userFromCookie = await Users.findOne({
        where: { id: req.cookies.userId },
      });
    }

    if (userFromCookie) {
      res.locals.userFound = true;
      res.locals.userLogged = req.session.userLogged = userFromCookie;
    }
  }

  next();
};

module.exports = sessionMiddleware;

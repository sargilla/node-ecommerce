module.exports = (req, res, next) => {
  let dateNow = Date.now();
  console.log("dateNow", dateNow);
  console.log("lastActivity:", req.session.lastActitity);
  // reviso si es un usuario
  if (req.session.userLogged && req.session.lastActitity) {
    // resto las fecha en formato numerico
    let compare = dateNow - req.session.lastActitity;
    // console.log("fechas comparadas", compare);
    // si es mayor a 30 min, redirijo al login
    if (compare > 1000 * 60 * 30) {
      req.session.destroy();
      return res.redirect("/login");
    }
    // sino actualizo la fecha en formato numerico
    req.session.lastActitity = dateNow;
  }
  return next();
};

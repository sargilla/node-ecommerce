const { check } = require("express-validator");

const validations = [
  check("email").isEmail().withMessage("El email es invalido"),
  check("password", "Password invalido").notEmpty(),
];

module.exports = validations;

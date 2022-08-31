const { body } = require("express-validator");

const validations = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("Debes de ingresar tu nombre")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Debes ingresar entre 3 y 20 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Debes de ingresar tu email")
    .bail()
    .isEmail()
    .withMessage("Debes ingresar un formato de correo electrónico válido"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Debes de ingresar una contraseña")
    .bail()
    .isStrongPassword()
    .withMessage(
      "Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"
    ),
  body("confirm-password")
    .trim()
    .notEmpty()
    .withMessage("Debes de ingresar una contraseña")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        // Mensaje en caso de no coincidir
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];

module.exports = validations;

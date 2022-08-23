const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer')
const { check } = require('express-validator')

const controller = require('../controllers/authController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer ({storage})

router.get('/login', controller.showLogin);
router.post('/login', controller.login);

router.get('/register', controller.showRegister);
router.post('/register', upload.any(), [
    check('email').isEmail().withMessage('El email es invalido'),
    check('password', 'Password invalido').notEmpty().bail()
      .custom(async (password, {req}) => {
        const cpassword = req.body['confirm-password']
   
        // If password and confirm password not same
        // don't allow to sign up and throw error
        if(cpassword !== password){
          throw new Error('Las pass deben coincidir')
        }
      }).bail()
],  controller.register);

router.post('/logout', controller.logout);

router.get('/profile', controller.profile)

router.get('/confirm-user', controller.confirmUser)

module.exports = router;

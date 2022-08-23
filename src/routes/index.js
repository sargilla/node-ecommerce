const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController')

/* GET home page. */
router.get('/', controller.home);

module.exports = router;

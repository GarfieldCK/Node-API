const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController')

router.route('/')
    .get(loginController)

module.exports = router ;
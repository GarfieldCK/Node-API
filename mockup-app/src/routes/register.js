const express = require("express");
const router = express.Router();
const registerController = require('../controllers/registerController')

router.route('/')
    .get(registerController)

module.exports = router ;
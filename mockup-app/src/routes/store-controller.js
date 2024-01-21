const express = require("express");
const router = express.Router();
const storeController = require('../controllers/storeUserController')

router.route('/')
    .post(storeController)

module.exports = router ;
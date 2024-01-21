const express = require("express");
const router = express.Router();
const itemsController = require('../../controllers/productController');

router.route('/')
    .get(itemsController.getAllItems)
    .post(itemsController.createNewItem)
    .put(itemsController.updateItem)
    .delete(itemsController.deleteItem);

router.route('/:id')
    .get(itemsController.getItem);

module.exports = router;
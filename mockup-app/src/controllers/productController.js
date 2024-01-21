const { v4: uuidv4 } = require("uuid");
const data = {
    items: require('../models/product.json'),
    setItems: function (data) { this.items = data }
}

// Get methods:
const getAllItems = (req, res) => {
    res.json({message: data.items})
}

const getItem = (req, res) => {
    const item = data.items.find(elem => elem.id === (res.body.id));
    if (!item) {
        return res.status(400).json({message : `Could not find item with ID ${res.body.id}`});
    }
    res.json({message: item})
}

// Post methods:
const createNewItem = (req, res) => {
    const newItem = {
        id: data.items.length ? ((data.items[data.items.length - 1].id) + 1).toString() : "1",
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
    }
    if (!newItem.name || 
        !newItem.price || 
        !newItem.quantity) {
            return res.status(400).json({message : "Name, Quantity and price are mandatory require "});
    }
    data.setItems([...data.items, newItem]);
    res.json({message : data.items})
}

// Update method:
const updateItem = (req, res) => {
    console.log(req.body.id);
    const item = data.items.find(elem => elem.id === (req.body.id));
    if (!item) {
        return res.status(400).json({message : `Could not find item with ID ${req.body.id}`});
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.price) item.price = req.body.price;
    if (req.body.quantity) item.quantity = req.body.quantity;

    const filteredArray = data.items.filter(elem => elem.id !== (req.body.id));
    const unsortedArray = [...filteredArray, item];
    data.setItems(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json({message: data.items})

}

// Delete method:

const deleteItem = (req, res) => {
    const item = data.items.find(elem => elem.id === (req.body.id));
    if (!item) {
        return res.status(400).json({message: `Could not find item with ID ${req.body.id}`});
    }
    const filteredArray = data.items.find(elem => elem.id !== (req.body.id));
    console.log(filteredArray);
    data.setItems([...filteredArray]);
    res.json({message: data.items})
}

module.exports = {
    getAllItems,
    getItem,
    createNewItem,
    updateItem,
    deleteItem
}
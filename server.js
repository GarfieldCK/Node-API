/**
 * Step 0: Install require package
 * Step1 : Set up the routes
 * Step 2 : Connect to database
 * Step 3 : Build a data model
 * Step 4 : Try to post a product onto a databased
 * Step 5 : Install middleware to make the server understand JSON
 * Step 6 : Connect to dabased with async and await
 * Step 7 : Fetch and get data from databased
 * Step 8 : Update data in databased
 */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel")

// Middle ware
app.use(express.json());
app.use(express.urlencoded({extended : false}))


// API Interaction
app.get('/', (request, response) => {
    response.send('Hello Node API')
});

app.get('/blog', (request, response) => {
    response.send('Hello blog')
});

app.get('/product', async(req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})


app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

// Update the product
app.put('/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({message : `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({message : updatedProduct});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

// Delete a product
app.delete('/product/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({message : `cannot find any product with ID ${id}`});
        }
        res.status(200).json({message : product})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

// Connnect databased : MongoDB
// Setup the routes
// mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:admin-node-dev@fillnode-api.jji1szs.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connneted to MongoDB . . .')
    app.listen(3000, ()=> {
        console.log('Node API is runing on port 3000')
    });
}).catch(() => {
    console.log(error)
})


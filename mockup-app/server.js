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
 * Step 9 : Apply MVC pattern to the design
 * Step 10 : Setup authentication using Basic auth, OAuth, Token auth
 */

const express = require('express');
const app = express();
const { logger } = require('./src/middleware/logEvents');
const { authenticated } = require('./src/middleware/basicAuthentication');
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);
app.use(express.json());

// Basic HTTP authenticate middleware:
app.use(authenticated);

//routes
app.use('/items', require('./src/routes/api/products'));

// Run the server
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
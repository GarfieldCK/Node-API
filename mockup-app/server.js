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
 *  -> Building from scratch, using Passport.js
 * Step 11 : Building log in log out page
 */

const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session'); // Track user session
const flash = require('connect-flash') // logging error
const { logger } = require('./src/middleware/logEvents');

const PORT = process.env.PORT || 3500;

// MongoDB Connection
mongoose.connect('mongodb+srv://chonlasitkkaew:login-logout-password@cluster0.4n8n2xe.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

// Custom middleware logger
app.use(logger);
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'src' ,'public')))
app.use(flash());
app.use(expressSession({
    secret: "node secret"
}))

// Using View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views')); // Project structure level issues

//routes
app.use('/', require('./src/routes/root'));
app.use('/login', require('./src/routes/login'))
app.use('/register', require('./src/routes/register'));
app.use('/user/register', require('./src/routes/store-controller'))
app.use('/items', require('./src/routes/api/products'));

// Run the server
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
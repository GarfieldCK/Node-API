const express = require("express");
const app = express();

// Routes

app.get('/', (request, response) => {
    response.send('Hello Node API')
});

app.get()

app.listen(3000, ()=> {
    console.log('Node API is runing on port 3000')
});
const express = require('express');
const app = express(); 

app.use('/', (req, res) => {  //The function is called request handler
    res.send("Welcome Back Dikshant");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
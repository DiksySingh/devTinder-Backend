const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send("Server Working Fine!");
});

app.listen(3000, () => {
    console.log(`Server listening at port 3000`);
});
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Servidor rodando http://localhost:3000');
});

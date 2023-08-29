const express = require('express');
const app = express();

// Habilitamos o processamento do JSON
app.use(express.json());

const herois = ['Homem de Ferro', 'Doutor Estranho', 'Homem Aranha', 'Batman'];

// Endpoint principal
app.get('/', function (req, res) {
    res.send('Hello World');
});

// Read All -> [GET] /herois
app.get('/herois', function (req, res) {
    res.send(herois.filter(Boolean));
});

// Read By ID -> [GET] /herois/:id
app.get('/herois/:id', (req, res) => {
    const id = req.params.id - 1;
    res.send(herois[id] ? herois[id] : 'Registro não localizado');
});

// Create -> [POST] /herois
app.post('/herois', function (req, res) {
    herois.push(req.body.name);
    res.send('Registro criado com sucesso!');
});

// Update -> [PUT] /herois/:id
app.put('/herois/:id', (req, res) => {
    const id = req.params.id - 1;
    const novosDados = req.body.name;
    herois[id] = novosDados;
    res.send('Registro atualizado com sucesso!');
});

// Delete -> [DELETE] /herois/:id
app.delete('/herois/:id', (req, res) => {
    const id = req.params.id - 1;
    delete herois[id];

    res.send('Registro removido com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando http://localhost:3000');
});

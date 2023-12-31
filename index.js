const express = require('express'); // import do express
const { MongoClient, ObjectId } = require('mongodb'); // import MongoClient & ObjectId do mongodb
const cors = require('cors');
require('dotenv').config();

const dbName = process.env.DB_NAME; // nome do banco de dados
const dbUser = process.env.DB_USER; // nome do banco de dados
const dbPassword = process.env.DB_PASSWORD; // nome do banco de dados
const dbHost = process.env.DB_HOST; // nome do banco de dados

//const url = 'mongodb://127.0.0.1:27017'; // url do banco de dados
const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}`; // url do banco de dados
const client = new MongoClient(url); // instancia o client

const main = async () => {
    console.log('Conectando ao banco...');
    await client.connect(); // tenta fazer a conexao com o banco
    console.log('Banco de dados conectado!');
    const db = client.db(dbName); // informa pro client qual o banco de dados
    const collection = db.collection('herois'); // informa pro client qual a collection

    const app = express(); // instancia o express

    app.use(cors());
    app.use(express.json()); // Habilitamos o processamento do JSON

    // Endpoint principal
    app.get('/', (req, res) => {
        res.send('Heróis');
    });

    // Read All -> [GET] /herois
    app.get('/herois', async (req, res) => {
        const itens = await collection.find().toArray(); // busca todos os registros existentes na collection e transforma a informação em um array
        res.send(itens);
    });

    // Read By ID -> [GET] /herois/:id
    app.get('/herois/:id', async (req, res) => {
        const id = req.params.id;
        const item = await collection.findOne({
            _id: new ObjectId(id)
        }); // busca por um unico registro na collection filtrando pelo id
        res.send(item);
    });

    // Create -> [POST] /herois
    app.post('/herois', async (req, res) => {
        const item = req.body;
        await collection.insertOne(item); // inseri um novo registro na collection
        res.send(item);
    });

    // Update -> [PUT] /herois/:id
    app.put('/herois/:id', async (req, res) => {
        const id = req.params.id;
        const item = req.body;
        await collection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: item
            }
        ); // atualiza o registro ( $set: novos dados ) com base no filtro ( Id ) informado
        res.send(item);
    });

    // Delete -> [DELETE] /herois/:id
    app.delete('/herois/:id', async (req, res) => {
        const id = req.params.id;
        await collection.deleteOne({ _id: new ObjectId(id) }); // deleta um registro com base no filtro ( Id ) informado

        res.send('Registro removido com sucesso!');
    });

    app.listen(process.env.PORT || 3000);
};

main();

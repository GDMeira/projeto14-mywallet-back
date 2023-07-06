import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Configs
dotenv.config();
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
const collections = {teste: 'teste'};

try {
    await mongoClient.connect();
    console.log("Connected to MongoDB...");
    db = mongoClient.db();
} catch (error) {
    console.log(error.message);
}


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    let teste;

    try {
        const something = {testezin: 'doscria'};
        await db.collection(collections.teste).insertOne(something);
        teste = await db.collection(collections.teste).findOne(something);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

    res.send(teste);
})


// conection
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
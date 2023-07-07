import { collections, db } from "../database/db.js";


export async function getTeste(req, res) {
    let teste;

    try {
        const something = {testezin: 'doscria'};
        await db.collection(collections.teste).insertOne(something);
        teste = await db.collection(collections.teste).findOne(something);
    } catch (error) {
        res.status(500).send({message: error.message});
    }

    res.send(teste);
}
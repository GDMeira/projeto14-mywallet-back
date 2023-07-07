import { collections, db } from "../database/db.js";

async function findByEmail(email) {
    try {
        return await db.collection(collections.users).findOne({email});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function createUser(req, res) {
    if (await findByEmail(req.body.email)) return res.status(409).send({message: 'Email already in use.'});

    try {
        await db.collection(collections.users).insertOne(req.body);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
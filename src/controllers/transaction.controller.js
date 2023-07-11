import dayjs from "dayjs";
import { collections, db } from "../database/db.js";
import { ObjectId } from "mongodb";


export async function createTransaction(req, res) {
    try {
        db.collection(collections.transactions).insertOne({
            ...req.body,
            value: Number(req.body.value),
            date: dayjs().format('DD/MM/YYYY'),
            userId: req.headers.authorization
        })

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function getTransactions(req, res) {
    try {
        const transactions = await db.collection(collections.transactions)
            .find({userId: req.headers.authorization})
            .project({userId: 0})
            .sort({natural: -1})
            .toArray();

        res.send(transactions);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
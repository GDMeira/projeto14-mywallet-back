import { collections, db } from "../database/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'

async function findByEmail(email) {
    try {
        return await db.collection(collections.users).findOne({ email });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function createUser(req, res) {
    if (await findByEmail(req.body.email)) return res.status(409).send({ message: 'Email already in use.' });

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        await db.collection(collections.users).insertOne(req.body);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function login(req, res) {
    let user;

    try {
        user = await findByEmail(req.body.email);
        if (!user) return res.status(404).send({ message: 'User not founded, check your email or signUp.' });

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(401).send({ message: 'Password is incorrect.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    const token = uuid();

    try {
        const newSession = { token, userId: user._id.toString() };
        await db.collection(collections.sessions).insertOne(newSession);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    res.status(200).send({ token, name: user.name });

}

export async function logout(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '').trim();

    try {
        const result = await db.collection(collections.sessions).deleteOne({ token });

        // if (result.matchedCount === 0) return res.status(404).send({message: 'token nod found.'});
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
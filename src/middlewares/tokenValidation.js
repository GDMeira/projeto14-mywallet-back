import { collections, db } from "../database/db.js";


export async function tokenValidation(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '').trim();
    if (!token) return res.status(401).send({message: 'Acess unauthorized. Please login again.'});

    try {
        const result = await db.collection(collections.sessions).findOne({token});
        if (!result) return res.status(401).send({message: 'Acess unauthorized. Please login again.'});

        req.headers.authorization = result.userId;
        next()
    } catch (error) {
        res.status(500).send({message: error.message});
    }
    
}
import dotenv from "dotenv";
import { MongoClient } from "mongodb";


dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);
export const collections = {users: 'users', sessions: 'sessions', transactions: 'transactions'};

try {
    await mongoClient.connect();
    console.log("Connected to MongoDB...");
} catch (error) {
    console.log(error.message);
}

export const db = mongoClient.db();
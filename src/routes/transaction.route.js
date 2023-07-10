import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { stripHtmlValidation } from "../middlewares/stripHtmlValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { createTransaction, getTransactions } from "../controllers/transaction.controller.js";



const transactionRouter = Router();

transactionRouter.post('/transaction', 
    tokenValidation, stripHtmlValidation, schemaValidation(transactionSchema), createTransaction);

transactionRouter.get('/transaction',
    tokenValidation, getTransactions);



export default transactionRouter;
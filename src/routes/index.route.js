import { Router } from "express";
import authRouter from "./auth.route.js";
import transactionRouter from "./transaction.route.js";

const router = Router();

router.use(authRouter);
router.use(transactionRouter);

export default router
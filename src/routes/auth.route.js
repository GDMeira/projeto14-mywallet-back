import { Router } from "express"
import { getTeste } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get('/', getTeste);


export default authRouter
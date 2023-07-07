import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { createUserSchema } from "../schemas/createUserSchema.js";
import { stripHtmlValidation } from "../middlewares/stripHtmlValidation.js";
import { createUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/signup', stripHtmlValidation, schemaValidation(createUserSchema), createUser);


export default authRouter
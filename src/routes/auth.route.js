import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { createUserSchema } from "../schemas/createUserSchema.js";
import { stripHtmlValidation } from "../middlewares/stripHtmlValidation.js";
import { createUser, login, logout } from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post('/signup', stripHtmlValidation, schemaValidation(createUserSchema), createUser);
authRouter.post('/signin', schemaValidation(loginSchema), login);
authRouter.delete('/logout', logout);

export default authRouter
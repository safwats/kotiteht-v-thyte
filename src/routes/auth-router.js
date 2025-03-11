import express from "express"
import {login, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from "../middlewares/authentication.js";

const authRouter = express.Router();
// post to /api/auth/login
authRouter.post('/login', login);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
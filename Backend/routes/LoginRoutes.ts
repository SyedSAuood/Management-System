import express from 'express'
import { registerUser } from '../Controllers/LoginController';

const router = express.Router();




router.post('/',registerUser)












export default router;
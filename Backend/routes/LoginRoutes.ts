import express from 'express'
import { registerUser ,loginUser } from '../Controllers/LoginController';

const router = express.Router();

router.post('/',registerUser)

router.post('/login',loginUser)











export default router;
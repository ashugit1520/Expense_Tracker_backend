import express from 'express';
import createUser from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authLogin, authLogOut } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', authLogin);

router.post('/logout', authLogOut);

export default router;

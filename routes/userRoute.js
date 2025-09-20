import express from 'express';
import createUser from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/register', (req, res, next) => {
  console.log(req.body);
  next();
}, createUser);


export default router;

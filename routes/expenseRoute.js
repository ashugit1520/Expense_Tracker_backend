import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addExpense, deleteExpense, editExpense, getAllExpense, getMonthlyTrends, getRecentTransactions, totalExpenseSummary } from '../controllers/expenseController.js'

const router = express.Router();

router.post('/', verifyToken, (req, res, next) => {
  next();
}, addExpense);

router.put('/:id', verifyToken, (req, res, next) => {
  next()
}, editExpense);

router.get('/', verifyToken, getAllExpense);

router.delete('/:id', verifyToken, deleteExpense);

router.get("/summary", verifyToken, totalExpenseSummary);

router.get("/recent", verifyToken, getRecentTransactions);

router.get("/monthly-trends", getMonthlyTrends);

export default router;

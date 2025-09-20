import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import expenseRoutes from './routes/expenseRoute.js'
import connectDB from './config/db.js';
import  cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "https://expense-tracker-frontend-qs4p.vercel.app",
  credentials: true, 
}));


app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});


app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/expense',expenseRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

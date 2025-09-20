import mongoose, { Schema } from 'mongoose';
import shortid from  'shortid';

const expenseSchema = new mongoose.Schema(
  {
    _id: { type: String, default: shortid.generate }, 
    description: { type: String, required: true },
    category: { type: String, enum: ["Food", "Transport", "Entertainment", "Others"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

  },
  { timestamps: true }
);

const Expense = mongoose.model('Expenses', expenseSchema);

export default Expense;
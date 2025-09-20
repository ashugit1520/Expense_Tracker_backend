import User from '../models/user.js';
import Expense from '../models/expense.js'
import mongoose from 'mongoose';

const addExpense = async (req, res) => {
    const { title, description, category, amount, date } = req.body;

    const user = await User.findById(req.userId);

    try {
        const newExpense = new Expense({
            title,
            description,
            category,
            amount,
            date,
            user: user._id 
        });
        const savedUserExpense = await newExpense.save();
        res.status(201).json(savedUserExpense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
}

const editExpense = async (req, res) => {
    const expenseId = req.params.id;
    console.log("expenseId",expenseId);
    const { title, description, category, amount } = req.body;

    try {

        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (expense.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to edit this expense' });
        }


        if (title !== undefined) expense.title = title;
        if (description !== undefined) expense.description = description;
        if (category !== undefined) expense.category = category;
        if (amount !== undefined) expense.amount = amount;


        const updatedExpense = await expense.save();

        return res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update expense' });
    }
};


const getAllExpense = async (req, res) => {
    try {
        const { search, category, startDate, endDate, page = 1, limit = 3 } = req.query;

        const query = { user: req.userId };


        if (search) {
            query.description = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const expenses = await Expense.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Expense.countDocuments(query);

        res.status(200).json({
            expenses,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            totalExpenses: total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};
const deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    try {
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        if (expense.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this expense' });
        }

        await Expense.findByIdAndDelete(expenseId);

        return res.status(200).json({ message: 'Expense deleted successfully', id: expenseId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete expense' });
    }
};

const totalExpenseSummary = async (req, res) => {
  try {
  
    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.userId) } },

      {
        $group: {
          _id: null, 
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        }
      }
    ]);

    const categorySummary = await Expense.aggregate([
       { $match: { user: new mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json({
      totalExpense: summary.length > 0 ? summary[0].totalAmount : 0,
      totalCount: summary.length > 0 ? summary[0].count : 0,
      categorySummary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch total expense summary" });
  }
};


const getRecentTransactions = async (req, res) => {
  try {
    const { limit = 5 } = req.query; 

    const recentExpenses = await Expense.find({ user: req.userId })
      .sort({ date: -1 })   
      .limit(parseInt(limit));

    res.status(200).json({
      recentTransactions: recentExpenses,
      count: recentExpenses.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent transactions" });
  }
};


const getMonthlyTrends = async (req, res) => {
  try {
    const trends = await Expense.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, 
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        }
      },
      { $sort: { "_id": 1 } } 
    ]);

    res.json(trends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching monthly trends" });
  }
};


export { addExpense, editExpense, getAllExpense, deleteExpense, getRecentTransactions,totalExpenseSummary,getMonthlyTrends };
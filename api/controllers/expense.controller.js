import MaintenanceExpense from "../models/maintenanceExpense.model.js";
import OtherExpense from "../models/otherExpense.model.js";

const createMaintenanceExpense = async (req, res) => {
    try {
      const maintenanceExpenseData = req.body;
      const newMaintenanceExpense = await MaintenanceExpense.create(maintenanceExpenseData);
      res.status(201).json(newMaintenanceExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getMaintenanceExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Parse startDate and endDate strings into Date objects in UTC format
      const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
      const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format
  
      // Query for maintenance expenses within the specified period
      const maintenanceExpenses = await MaintenanceExpense.find({
        date: { $gte: parsedStartDate, $lte: parsedEndDate },
      });
  
      res.status(200).json(maintenanceExpenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const createOtherExpense = async (req, res) => {
    try {
      const otherExpenseData = req.body;
      const newOtherExpense = await OtherExpense.create(otherExpenseData);
      res.status(201).json(newOtherExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getOtherExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Parse startDate and endDate strings into Date objects in UTC format
      const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
      const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format
  
      // Query for other expenses within the specified period
      const otherExpenses = await OtherExpense.find({
        date: { $gte: parsedStartDate, $lte: parsedEndDate },
      });
  
      res.status(200).json(otherExpenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export {
    createOtherExpense,
    getOtherExpenses,
    createMaintenanceExpense,
    getMaintenanceExpenses,
  };




  const getAllExpenses = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Parse startDate and endDate strings into Date objects in UTC format
      const parsedStartDate = new Date(startDate + 'T00:00:00Z');
      const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');
  
      // Fetch maintenance expenses within the date range
      const maintenanceExpenses = await MaintenanceExpense.find({
        date: { $gte: parsedStartDate, $lte: parsedEndDate }
      });
  
      // Fetch other expenses within the date range
      const otherExpenses = await OtherExpense.find({
        date: { $gte: parsedStartDate, $lte: parsedEndDate }
      });
  
      // Return both sets of expenses
      return res.status(200).json({
        maintenanceExpenses,
        otherExpenses
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
  };


export default getAllExpenses;


// Update an expense record
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { category, amount, date, description, purchasedBy } = req.body;

  try {
    let expenseModel;

    // Check the category to determine which model to use
    if (category === 'maintenance') {
      expenseModel = MaintenanceExpense;
    } else if (category === 'others') {
      expenseModel = OtherExpense;
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Find the expense record by ID
    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense record not found' });
    }

    // Update the fields
    expense.amount = amount;
    expense.date = date;
    expense.description = description;
    expense.purchasedBy = purchasedBy;

    // Save the updated record
    await expense.save();

    // Return the updated record
    res.status(200).json({ message: 'Expense record updated successfully', expense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an expense record
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    let expenseModel;

    // Check the category to determine which model to use
    if (category === 'maintenance') {
      expenseModel = MaintenanceExpense;
    } else if (category === 'others') {
      expenseModel = OtherExpense;
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Find the expense record by ID
    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense record not found' });
    }

    // Delete the expense record
    await expense.deleteOne();

    // Return success message
    res.status(200).json({ message: 'Expense record deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

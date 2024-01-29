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


  
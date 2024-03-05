import express from 'express';
import getAllExpenses, {
  
  createMaintenanceExpense,
  getMaintenanceExpenses,
  

  createOtherExpense,
  getOtherExpenses,
  updateExpense,
  deleteExpense,
  
} from '../controllers/expense.controller.js'; // Adjust the import path


const expenseRouter = express.Router();


// MIANTENANCE
expenseRouter.post('/add-maintenance-expenses', createMaintenanceExpense);
expenseRouter.get('/maintenance-expenses', getMaintenanceExpenses);


expenseRouter.post('/add-other-expenses', createOtherExpense);
expenseRouter.get('/other-expenses', getOtherExpenses);

expenseRouter.get('/all-expenses', getAllExpenses);

// Update an expense record
expenseRouter.put('/update-expense/:id', updateExpense);

// Delete an expense record
expenseRouter.delete('/delete-expense/:id', deleteExpense);


export default expenseRouter;

import express from 'express';
import {
  
  createMaintenanceExpense,
  getMaintenanceExpenses,
  

  createOtherExpense,
  getOtherExpenses,
  
} from '../controllers/expense.controller.js'; // Adjust the import path


const expenseRouter = express.Router();


// MIANTENANCE
expenseRouter.post('/add-maintenance-expenses', createMaintenanceExpense);
expenseRouter.get('/maintenance-expenses', getMaintenanceExpenses);


expenseRouter.post('/add-other-expenses', createOtherExpense);
expenseRouter.get('/other-expenses', getOtherExpenses);


export default expenseRouter;

// Import necessary modules
import express from 'express';
import {
  createSnookerSale,
  getAllSnookerSales,
  getSnookerSaleById,
  updateSnookerSale,
  deleteSnookerSale,
  getAllSalesMadeToday,
  getSalesWithinPeriod,
} from '../controllers/sale.controller.js';

// Create an Express router
const saleRouter = express.Router();

// Define routes
saleRouter.post('/add-snooker-sales', createSnookerSale); // Create a new SnookerSale
saleRouter.get('/view-snooker-sales', getAllSnookerSales); // Get all SnookerSales
saleRouter.get('/snooker-sales/:id', getSnookerSaleById); // Get a specific SnookerSale by ID
saleRouter.put('/update-snooker-sales/:id', updateSnookerSale); // Update a SnookerSale by ID
saleRouter.delete('/delete-snooker-sales/:id', deleteSnookerSale); // Delete a SnookerSale by ID
saleRouter.get('/sales/today', getAllSalesMadeToday);
saleRouter.get('/sales/within-period', getSalesWithinPeriod);


// Export the router
export default saleRouter;

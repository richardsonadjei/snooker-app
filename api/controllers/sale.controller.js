// Import the SnookerSale model
import SnookerSale from '../models/sales.model.js';

// Controller to create a new SnookerSale
export const createSnookerSale = async (req, res) => {
  try {
    const snookerSale = new SnookerSale(req.body);
    await snookerSale.save();

    res.status(201).json({ success: true, message: 'SnookerSale created successfully', data: snookerSale });
  } catch (error) {
    console.error('Error creating SnookerSale:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get all SnookerSales
export const getAllSnookerSales = async (req, res) => {
  try {
    const snookerSales = await SnookerSale.find();
    res.status(200).json({ success: true, data: snookerSales });
  } catch (error) {
    console.error('Error getting SnookerSales:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get a specific SnookerSale by ID
export const getSnookerSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const snookerSale = await SnookerSale.findById(id);

    if (!snookerSale) {
      return res.status(404).json({ success: false, message: 'SnookerSale not found' });
    }

    res.status(200).json({ success: true, data: snookerSale });
  } catch (error) {
    console.error('Error getting SnookerSale by ID:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to update a SnookerSale by ID
export const updateSnookerSale = async (req, res) => {
  const { id } = req.params;

  try {
    const snookerSale = await SnookerSale.findByIdAndUpdate(id, req.body, { new: true });

    if (!snookerSale) {
      return res.status(404).json({ success: false, message: 'SnookerSale not found' });
    }

    res.status(200).json({ success: true, message: 'SnookerSale updated successfully', data: snookerSale });
  } catch (error) {
    console.error('Error updating SnookerSale:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to delete a SnookerSale by ID
export const deleteSnookerSale = async (req, res) => {
  const { id } = req.params;

  try {
    const snookerSale = await SnookerSale.findByIdAndDelete(id);

    if (!snookerSale) {
      return res.status(404).json({ success: false, message: 'SnookerSale not found' });
    }

    res.status(200).json({ success: true, message: 'SnookerSale deleted successfully' });
  } catch (error) {
    console.error('Error deleting SnookerSale:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Controller to get all SnookerSales made today
export const getAllSalesMadeToday = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    
    // Set the time to the beginning of the day
    currentDate.setHours(0, 0, 0, 0);

    // Get all SnookerSales made today
    const snookerSalesToday = await SnookerSale.find({
      createdAt: { $gte: currentDate },
    });

    res.status(200).json({ success: true, data: snookerSalesToday });
  } catch (error) {
    console.error('Error getting SnookerSales made today:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Controller to get all SnookerSales within a specified period
export const getSalesWithinPeriod = async (req, res) => {
  try {
    // Parse startDate and endDate strings into Date objects in UTC format
    const { startDate, endDate } = req.query;
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Get all SnookerSales within the specified period
    const snookerSalesWithinPeriod = await SnookerSale.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ success: true, data: snookerSalesWithinPeriod });
  } catch (error) {
    console.error('Error getting SnookerSales within the specified period:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

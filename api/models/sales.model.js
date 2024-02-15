// Import mongoose
import mongoose from 'mongoose';

// Define the SnookerSale schema
const snookerSaleSchema = new mongoose.Schema({
  transactionID: {
    type: String,
    unique: true,
  },
  saleDate: {
    type: Date,
    default: Date.now, // Set default value to the current date
  },
  unitPricePerGame: {
    type: Number,
    default: 2, // Set default value to 5
  },
  numberOfGames: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
 
  },
  recordedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a pre-save hook to generate transactionID and calculate totalAmount
snookerSaleSchema.pre('save', async function (next) {
  try {
    // Generate transactionID
    const lastRecord = await this.constructor.findOne({}, {}, { sort: { transactionID: -1 } });
    const lastTransactionNumber = lastRecord ? parseInt(lastRecord.transactionID.replace('SN', '')) : 0;
    const nextTransactionNumber = lastTransactionNumber + 1;
    this.transactionID = `SN${nextTransactionNumber.toString().padStart(4, '0')}`;

    // Calculate totalAmount
    this.totalAmount = this.unitPricePerGame * this.numberOfGames;

    next();
  } catch (error) {
    next(error);
  }
});

// Create the SnookerSale model
const SnookerSale = mongoose.model('SnookerSale', snookerSaleSchema);

// Export the SnookerSale model
export default SnookerSale;

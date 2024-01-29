// Import required dependencies
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signin,
  updateProfile,
  signout,
} from '../controllers/user.controller.js';

// Create an Express Router
const userRouter = express.Router();

// Routes for CRUD operations

// Create a new user
userRouter.post('/create-new-user', createUser);

// Get all users
userRouter.get('/get-users', getAllUsers);

// Get a single user by ID
userRouter.get('/get-user/:id', getUserById);

// Update a user by ID
userRouter.put('/update-user/:id', updateProfile);

// Delete a user by ID
userRouter.delete('/delete-user/:id', deleteUserById);


userRouter.post('/signin', signin);
userRouter.post('/signout', signout);



// Export the router
export default userRouter;

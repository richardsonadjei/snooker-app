// Import the User model
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controller for creating a new user
export const createUser = async (req, res,next) => {
    try {
      // Extract password from the request body
      const { password, ...userData } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = await User.create({
        ...userData,
        password: hashedPassword,
      });
  
      
      res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
  };

// Controller for getting all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller for deleting a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// SIGN-IN
export const signin = async (req, res, next) => {
  const { userNameOrEmail, password } = req.body;

  try {
    // Find user by userName or email
    const validUser = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    // Check if the user is not found
    if (!validUser) {
      return res.status(404).json({ error: 'User not found!' });
    }

    // Check if the password is valid
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Wrong credentials!' });
    }

    // Include relevant information in the token payload
    const tokenPayload = {
      id: validUser._id,
      userName: validUser.userName,
      email: validUser.email,
      role: validUser.role,
    };

    // Sign the token with the payload
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie and include user details in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        id: validUser._id,
        userName: validUser.userName,
        email: validUser.email,
        role: validUser.role,
      });

  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.params.id;
  const { userName, email, password, newPassword, confirmPassword } = req.body;

  try {
    // Authentication check
    if (req.user.id !== userId) {
      return res.status(401).json({ success: false, statusCode: 401, message: 'You can only update your own account!' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, statusCode: 404, message: 'User not found!' });
    }

    // Update userName and email fields
    user.userName = userName;
    user.email = email;

    // Update password if provided
    if (password && newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, statusCode: 400, message: "New password and confirm password don't match." });
    }

    if (newPassword) {
      // Hash the new password before saving
      const saltRounds = 10;
      const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    // Respond with the updated user (excluding sensitive information)
    const { password: userPassword, ...rest } = user._doc;
    res.status(200).json({ success: true, statusCode: 200, ...rest });
  } catch (error) {
    next(error);
  }
};






// auth.controller.js
export const signout = (req, res) => {
  // Clear the token cookie to sign the user out
  res.clearCookie('access_token', { httpOnly: true });
  
  // Send a response indicating successful sign out
  res.status(200).json({ success: true, message: 'User signed out successfully!' });
};
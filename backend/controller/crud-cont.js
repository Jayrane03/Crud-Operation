const UserModel = require("../models/auth-model");
const multer = require("multer");
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});



const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and JPG files are allowed.'), false);
    }
};


const upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5, // 5MB file size limit
    },
    fileFilter: fileFilter,
});

// Controller function to add a new user
// Controller function to add a new user
// controller/crud-cont.js

const addUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        let imagePath = null;

        // Check if a file is included in the request
        if (req.file) {
            // If a file is included, set imagePath to the filename
            imagePath = req.file;
        }
        
        // Create a new user instance with the provided data
        const user = new UserModel({ name, email, age, password, imagePath });

        // Save the user data to the database
        const userData = await user.save();

        // Send a response indicating successful user creation
        res.status(201).json(userData);
        
    } catch (error) {
        // Handle errors
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Error adding user" });
    }
};





// Controller function to read all users
const readAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error reading users:", error);
        res.status(500).json({ error: "Error reading users" });
    }
};

// Controller function to update a user

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'assignee', 'priority', 'team'];
  
    // Check if all updates are allowed
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }
  
    try {
      // Find and update the task by ID
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Send the updated task as a JSON response
      res.json(task);
    } catch (error) {
      // Handle any errors and send an appropriate response
      res.status(400).json({ error: error.message });
    }
  };
  
// Controller function to delete a user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = { addUser, updateUser, upload, deleteUser, readAllUsers };

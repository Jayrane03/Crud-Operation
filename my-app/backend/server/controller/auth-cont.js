const User = require("../models/user-model");
const multer = require("multer");
const path = require('path');

//Using multer for the image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads/');
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"|| file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 1024 *1024 *5, // 5MB file size limit
    },
    fileFilter: fileFilter,
});

const addUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        let imagePath = null;

        if (req.file) {
            imagePath = req.file.filename;
        }

        const user = new User({ name, email, age, imagePath });
        const userData = await user.save();
        res.status(201).json(userData);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Error adding user" });
    }
};

const readAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error reading users:", error);
        res.status(500).json({ error: "Error reading users" });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, age } = req.body;
        const updatedData = { name, email, age };

        if (req.file) {
            const imagePath = req.file.filename;
            updatedData.imagePath = imagePath;
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addUser, updateUser, upload, deleteUser, readAllUsers };

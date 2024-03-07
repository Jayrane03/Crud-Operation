const mongoose = require("mongoose");

// Define the user schema with timestamps
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;

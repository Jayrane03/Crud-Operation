const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jayurane32003:jayrane53@usercluster.kahmwjc.mongodb.net/employee?retryWrites=true&w=majority&appName=UserCluster');

app.post('/api/register', async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ status: "Error", message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Generate JWT token for the newly registered user
        const token = jwt.sign({
            userId: newUser._id,
            email: newUser.email,
        }, 'your_secret_key_here', { expiresIn: '1h' }); // Set token expiration to 1 hour

        res.json({ status: "OK", user: newUser, token }); // Include token in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ status: "Error", message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ status: "Error", message: "Invalid password" });
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
        }, 'secret123', { expiresIn: '1h' });

        // Return user data along with the token
        res.json({ status: "OK", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
});

app.get('/api/home', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.json({ status: 'OK', user: user }); // Sending response with status 'OK' and user data
        } else {
            res.status(404).json({ status: 'Error', message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

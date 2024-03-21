const express = require("express");
const app = express();
const path = require('path');
const authRoute = require("./routes/route");
const updateUserRoute = require("./routes/route"); 
const deleteRoute = require("./routes/route");  
const readAllRoute = require("./routes/route"); 
const connectDB = require("./utils/db");
const cors = require("cors")
const PORT = 5000;

app.use(express.json());

app.use(cors())


app.use("/", authRoute);
app.use("/add", authRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/update/:id", updateUserRoute);
app.use("/delete/:id", deleteRoute);
app.use("/readallusers", readAllRoute);

// Get route
app.get("/", (req, res) => {
    res.send("From get route");
});



// Connect to the database and server is started
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});

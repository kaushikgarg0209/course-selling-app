const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', 'https://course-selling-86cu18ca4-kaushikgarg0209.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://kaushiksecond2:kaushik00@cluster0.de1wsto.mongodb.net/', {dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));

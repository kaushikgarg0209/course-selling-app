const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const PORT = 3000;

const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', 'https://course-selling-86cu18ca4-kaushikgarg0209.vercel.app');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://kaushiksecond2:kaushik00@cluster0.de1wsto.mongodb.net/', {dbName: "courses" });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

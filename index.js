const express = require('express');
const { connection } = require('./config/db');
require("dotenv").config()
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { noteRouter } = require('./routes/notes.route');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/notes", noteRouter)
app.listen(PORT , async() => {
    try {
        await connection
        console.log("server is running at port", PORT)
    } catch (error) {
        console.log(error.message)
    }
})
const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const dotenv = require("dotenv").config();
require("./config/dbConnect");

const app = express();

//------------
// user Routes
app.use('/api/v1/users',userRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server is runing on ${PORT}`));

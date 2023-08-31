const express = require("express");
const dotenv = require("dotenv").config();
require("./config/dbConnect");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server is runing on ${PORT}`));

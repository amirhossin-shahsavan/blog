const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRoutes = require("./routes/posts/postRoutes");
const commentRoutes = require("./routes/comments/commentRoutes");
const categoryRoutes = require("./routes/categories/categoryRoutes");
const dotenv = require("dotenv").config();
require("./config/dbConnect");

const app = express();

//------------
// user Routes

app.use("/api/v1/users", userRouter);

//------------
// post Routes

app.use("/api/v1/posts", postRoutes);

//------------
// comment Routes

app.use("/api/v1/comments", commentRoutes);

//------------
// category Routes

app.use("/api/v1/categorys", categoryRoutes);

//------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is runing on ${PORT}`));

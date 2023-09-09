const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRoutes = require("./routes/posts/postRoutes");
const commentRoutes = require("./routes/comments/commentRoutes");
const categoryRoutes = require("./routes/categories/categoryRoutes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const dotenv = require("dotenv").config();
require("./config/dbConnect");

const app = express();
app.use(express.json());

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
// Error handeler middleware

app.use(globalErrorHandler);

// not found error

app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - Route Not Found`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is runing on ${PORT}`));

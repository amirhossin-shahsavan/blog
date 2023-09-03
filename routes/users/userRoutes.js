const express = require("express");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user register",
    });
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user login",
    });
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.get("/profile/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user profile",
    });
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user update",
    });
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user delete",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = userRouter;

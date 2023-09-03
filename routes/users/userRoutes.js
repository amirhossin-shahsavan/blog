const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userUpdateCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
} = require("../../controllers/users/userCtrl");

const userRouter = express.Router();

userRouter.post("/register", userRegisterCtrl);

userRouter.post("/login", userLoginCtrl);

userRouter.get("/profile/:id", userProfileCtrl);

userRouter.get("/", usersCtrl);

userRouter.put("/:id", userUpdateCtrl);

userRouter.delete("/:id", userDeleteCtrl);

module.exports = userRouter;

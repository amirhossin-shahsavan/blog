const express = require("express");
const {
  userEmailRegisterCtrl,
  userLoginCtrl,
  userUpdateCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
} = require("../../controllers/users/userCtrl");

const userRouter = express.Router();

userRouter.post("/register/email", userEmailRegisterCtrl);

// userRouter.post("/register/phone", userPhoneRegisterCtrl);

userRouter.post("/login", userLoginCtrl);

userRouter.get("/profile/:id", userProfileCtrl);

userRouter.get("/", usersCtrl);

userRouter.put("/:id", userUpdateCtrl);

userRouter.delete("/:id", userDeleteCtrl);

module.exports = userRouter;

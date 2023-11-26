const express = require("express");
const {
  userEmailRegisterCtrl,
  userLoginCtrl,
  userUpdateCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  profilePhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowingCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const userRouter = express.Router();

// instance of multer
const upload = multer({ storage });

userRouter.post("/register/email", userEmailRegisterCtrl);

// userRouter.post("/register/phone", userPhoneRegisterCtrl);

userRouter.post("/login", userLoginCtrl);

userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl
);

userRouter.get("/profile/", isLogin, userProfileCtrl);

userRouter.get("/", isLogin, usersCtrl);

userRouter.put("/:id", isLogin, userUpdateCtrl);

userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

userRouter.get("/following/:id", isLogin, followingCtrl);

userRouter.get("/unfollowing/:id", isLogin, unFollowingCtrl);

userRouter.get("/blocked/:id", isLogin, blockUserCtrl);

userRouter.get("/unblocked/:id", isLogin, unBlockUserCtrl);

userRouter.get("/admin-block/:id", isAdmin, adminBlockUsersCtrl);

userRouter.get("/admin-unblock/:id", isAdmin, adminUnBlockUsersCtrl);

userRouter.delete("/:id", userDeleteCtrl);

module.exports = userRouter;

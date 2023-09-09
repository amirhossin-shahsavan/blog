const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeaders");
const { appErr, AppErr } = require("../../utils/appErr");

const userEmailRegisterCtrl = async (req, res, next) => {
  const { firstname, Lastname, profilephoto, email, password } = req.body;
  try {
    // check email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exist", 500));
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    // create the user
    const user = await User.create({
      firstname,
      Lastname,
      email,
      password: hashedpass,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userLoginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("invalid login credentional", 500));
    }
    // verifying
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(appErr("invalid login credentional", 500));
    }
    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        Lastname: userFound.Lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all user profile",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userUpdateCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user userUpdateCtrl",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userDeleteCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user delete",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  userEmailRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};

const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");

const userEmailRegisterCtrl = async (req, res) => {
  const { firstname, Lastname, profilephoto, email, password } = req.body;
  try {
    // check email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        message: "User Already Exist",
      });
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
    res.json(error.message);
  }
};

const userLoginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        message: "invalid login credentional",
      });
    }
    // verifying 
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.json({
        message: "invalid login credentional",
      });
    }
    res.json({
      status: "success",
      data: "user userLoginCtrl",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userProfileCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user userUpdateCtrl",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all user profile",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userUpdateCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user userUpdateCtrl",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userDeleteCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user delete",
    });
  } catch (error) {
    res.json(error.message);
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

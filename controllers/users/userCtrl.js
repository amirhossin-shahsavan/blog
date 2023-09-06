const User = require("../../model/User/User");

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

    // create the user
    const user = await User.create({
      firstname,
      Lastname,
      email,
      password,
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
    const isPasswordMatch = await User.findOne({ password });
    if (!userFound || !isPasswordMatch) {
      return res.json({
        message: "check your email or password.",
      });
    }
    //

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

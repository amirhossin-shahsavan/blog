const userRegisterCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user register",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userLoginCtrl = async (req, res) => {
  try {
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
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};

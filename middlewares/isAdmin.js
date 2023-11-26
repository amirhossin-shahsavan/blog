const User = require("../model/User/User");
const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  // token from header
  const token = getTokenFromHeader(req);
  //   verify the token
  const decodedUser = verifyToken(token);
  //   save user into req obj
  req.userAuth = decodedUser.id;

  const user = await User.findById(decodedUser.id);

  if (user.isAdmin) {
    return next();
  } else {
    next(appErr("access denied", 403));
  }

  if (!decodedUser) {
    return next(appErr("invalid/Expire token , please login again"));
  } else {
    next();
  }
};

module.exports = isAdmin;

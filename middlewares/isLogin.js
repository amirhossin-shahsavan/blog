const getTokenFromHeader = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  // token from header
  const token = getTokenFromHeader(req);
  //   verify the token
  const decodedUser = verifyToken(token);
  //   save user into req obj
  req.userAuth = decodedUser.id  
  if (!decodedUser) {
    return res.json({
      message: "invalid/Expire token , please login again",
    });
  } else {
    next();
  }
};

module.exports = isLogin;

const getTokenFromHeader = (req) => {
  const headerObj = req.headers;

  const token = headerObj.token;

  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "failed",
      message: "there is no token attached to the header",
    };
  }
};

module.exports = getTokenFromHeader;

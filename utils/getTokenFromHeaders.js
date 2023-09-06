const getTokenFromHeader = (req) => {
  const headerObj = req.headers;

  const token = headerObj.token;

  if (token !== undefined) {
    return token;
  } else {
    return false;
  }
};

module.exports = getTokenFromHeader;

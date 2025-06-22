const jwt = require("jsonwebtoken");
const { JWT_SECRET, REFRESH_SECRET } = process.env;

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); 
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};

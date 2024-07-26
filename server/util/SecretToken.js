require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
  token = jwt.sign({ id }, process.env.JWT_KEY, { algorithm: "RS256" });
};

module.exports = createSecretToken

const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const validation = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] || null;
    console.log(token);
    if (token) {
      const decodedData = jwt.verify(token, secret);
      
      req.data = decodedData;
      next();
    } else {
      return res.status(403).json({message: "Access forbidden"});
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = validation;

const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const validation = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({message: "Not authorized"});
      }
      const data = jwt.verify(token, secret);
      const {roles: userRoles} = data;
      req.data = data;
      let hasRole = false;
      roles.forEach((role) => {
        if (userRoles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({message: "Not authorized"});
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = validation;

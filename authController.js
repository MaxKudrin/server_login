const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {validationResult} = require("express-validator");
const {secret} = require("./config");

const createWebToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, {expiresIn: "24h"});
};

const controller = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const {errors: error} = errors;
        return res
          .status(400)
          .json({errorMessage: error[0].msg, param: error[0].param});
      }
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (user) {
        return res.status(400).json({errorMessage: "User already exist", param: 'username'});
      }
      const hashPassword = bcrypt.hashSync(password, 4);
      const role = await Role.findOne({value: "USER"});
      const newUser = new User({
        username,
        password: hashPassword,
        roles: [role.value],
      });
      await newUser.save();
      return res.status(200).json({message: "User registration success"});
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({errorMessage: "User is not exist", param: 'username'});
      }
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({errorMessage: "Password is incorrect", param: 'password'});
      }
      const token = createWebToken(user._id, user.roles);
      return res.status(200).json({message: "Login success", token});
    } catch (error) {
      console.log(error);
    }
  },
  users: async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
  },
};
module.exports = controller;

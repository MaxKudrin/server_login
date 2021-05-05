const Router = require("express");
const controller = require("./authController");
const roleMiddleware = require("./middleware/roleMiddleware");
const {body} = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  body("username")
    .notEmpty({ignore_whitespace: true})
    .withMessage("Username should not be empty"),
  body("password").isLength({min: 4}).withMessage("Minimum length is 4 chars"),
  controller.registration
);
router.post("/login", controller.login);
router.post("/users", roleMiddleware(["ADMIN"]), controller.users);

module.exports = router;

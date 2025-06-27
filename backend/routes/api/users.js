const express = require("express");
const ctrl = require("../../controllers/users");
const {
  validateSignup,
  validateLogin,
} = require("../../validation/userValidation");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", validateSignup, ctrl.signup);
router.post("/login", validateLogin, ctrl.login);
router.get("/logout", ctrl.logout);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.resendVerificationEmail);
router.post("/refresh", ctrl.refreshToken);
router.get("/current", auth, ctrl.getCurrentUser);

module.exports = router;

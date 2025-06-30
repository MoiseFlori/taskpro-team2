const express = require("express");
const passport = require("passport");
const { googleAuthCallback } = require("../../controllers/googleAuth");

const router = express.Router();

router.get(
  "/auth/google",
  (req, res, next) => {
    console.log("👉 A ajuns în /auth/google");
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      if (err || !user) {
        let reason = "generic";

        if (info?.message?.includes("email")) {
          reason = "email-exists";
        }

        return res.redirect(
          `${process.env.FRONTEND_URL}/google-login-fail?reason=${reason}`
        );
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  googleAuthCallback
);

console.log("✅ Google auth routes loaded");

module.exports = router;

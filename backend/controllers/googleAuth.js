const { createAccessToken, createRefreshToken } = require("../helpers/jwt");
const User = require("../models/user");

const googleAuthCallback = async (req, res) => {
  try {
    const accessToken = createAccessToken({ id: req.user._id });
    const refreshToken = createRefreshToken({ id: req.user._id });

    await User.findByIdAndUpdate(req.user._id, { refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/home?token=${accessToken}`);
  } catch (error) {
    console.error("Google auth callback error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL}/google-login-fail?reason=server-error`
    );
  }
};

module.exports = { googleAuthCallback };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { nanoid } = require("nanoid");
const sgMail = require("@sendgrid/mail");
const { createAccessToken, createRefreshToken } = require("../helpers/jwt");

const { FRONTEND_URL } = process.env;
const BASE_URL = process.env.BASE_URL;
sgMail.setApiKey(process.env.EMAIL_API);

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verify: false,
  });
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: "Confirmă-ți adresa de email",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; color: #333; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #2e7d32;">Salut, ${name}!</h2>
        <p>Îți mulțumim că te-ai înregistrat. Ca să îți activăm contul, te rugăm să confirmi adresa ta de email.</p>
        <p style="margin: 24px 0;">
          <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Verifică emailul
          </a>
        </p>
        <p>Dacă nu ai cerut crearea unui cont, poți ignora acest mesaj.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777;">Acest email a fost generat automat. Nu răspunde direct la el.</p>
      </div>
    `,
  };

  await sgMail.send(msg);

  res.status(201).json({
    user: {
      name,
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(401).json({ message: "Email not verified" });
  }

  const accessToken = createAccessToken({ id: user._id });
  const refreshToken = createRefreshToken({ id: user._id });

  await User.findByIdAndUpdate(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 zile
  });

  return res.status(200).json({
    accessToken,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({
    user: {
      name,
      email,
    },
  });
};


const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    await User.findByIdAndUpdate(id, { refreshToken: null });
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL}/verify-fail`);
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.redirect(`${process.env.FRONTEND_URL}/verify-success`);
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = user.verificationToken;
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: "Confirmă-ți adresa de email",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; color: #333; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #2e7d32;">Salut, ${name}!</h2>
        <p>Îți mulțumim că te-ai înregistrat. Ca să îți activăm contul, te rugăm să confirmi adresa ta de email.</p>
        <p style="margin: 24px 0;">
          <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Verifică emailul
          </a>
        </p>
        <p>Dacă nu ai cerut crearea unui cont, poți ignora acest mesaj.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777;">Acest email a fost generat automat. Nu răspunde direct la el.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending verification email" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = createAccessToken({ id });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  getCurrentUser,
};

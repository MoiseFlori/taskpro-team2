const Joi = require("joi");

// Regex pentru parola: 8–64 caractere, fără spații
const passwordRegex = /^[^\s]{8,64}$/;

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(32).trim().required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 32 characters",
  }),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email format",
    }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Password is required",
    "string.pattern.base":
      "Password must be 8–64 characters, no spaces allowed",
  }),
});

const loginSchema = Joi.object({
  email: signupSchema.extract("email"),
  password: signupSchema.extract("password"),
});


const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = { validateSignup, validateLogin };

import * as Yup from "yup";

const email = Yup.string()
  .required("Email is required")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email format"
  );

const password = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces");

const name = Yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(32, "Name must be at most 32 characters");

export const registerValidationSchema = Yup.object({
  email,
  password,
  name,
});

export const loginValidationSchema = Yup.object({
  email,
  password,
});

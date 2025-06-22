import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import styles from "./LoginRegisterForm.module.css";
import Icon from "../Icon";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../schemas/validationSchema";
import { useDispatch } from "react-redux";
import { registerThunk, loginThunk } from "../../redux/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRegisterForm = () => {
  const { id } = useParams();
  const isLogin = id === "login";
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validationSchema = isLogin
    ? loginValidationSchema
    : registerValidationSchema;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = isLogin
          ? { email: values.email, password: values.password }
          : values;

        if (isLogin) {
          await dispatch(loginThunk(formData)).unwrap();
          resetForm();
          navigate("/home");
        } else {
          await dispatch(registerThunk(formData)).unwrap();
          resetForm();
          toast.success("Check your email to verify your account.", {
            style: {
              background: "#151515",
              color: "#BEDBB0",
              fontSize: "16px",
            },
          });

          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Auth failed:", error);
      }
    },
  });

  return (
    <div className={styles.background}>
      <div className={styles.formWrap}>
        <ul className={styles.authList}>
          <li>
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                isActive
                  ? `${styles.authLink} ${styles.active}`
                  : styles.authLink
              }
            >
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                isActive
                  ? `${styles.authLink} ${styles.active}`
                  : styles.authLink
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </label>
          )}

          <label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>

          <label className={styles.passInputWrap}>
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder={isLogin ? "Confirm a password" : "Create a password"}
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              onClick={() => setVisible((prev) => !prev)}
              className={styles.hideBtn}
            >
              <Icon name={visible ? "icon-eye" : "icon-eye-crossed"} />
            </button>
          </label>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          >
            {isLogin ? "Log In Now" : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;

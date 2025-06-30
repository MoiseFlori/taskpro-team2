import { useSearchParams, Link } from "react-router-dom";
import styles from "./GoogleLoginFail.module.css";

const GoogleLoginFail = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  const getMessage = () => {
    switch (reason) {
      case "email-exists":
        return "An account with this email already exists and was created using email and password. Please sign in using the classic login method.";
      case "server-error":
        return "An internal error occurred. Please try again later.";
      default:
        return "Unfortunately, we couldn't sign you in with your Google account. Please try again or use the classic login method.";
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Google Sign-In Error</h2>
      <p>{getMessage()}</p>
      <Link to="/auth/login">
        <button className={styles.backButton}>Back to Login</button>
      </Link>
    </div>
  );
};

export default GoogleLoginFail;

import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import styles from "./Welcome.module.css";
import StartImgMob1x from "../../assets/images/welcome-mob-1x.png";
import StartImgMob2x from "../../assets/images/welcome-mob-2x.png";
import StartImgTab1x from "../../assets/images/welcome-tab-1x.png";
import StartImgTab2x from "../../assets/images/welcome-tab-2x.png";
import StartImgDesk1x from "../../assets/images/welcome-desk-1x.png";
import StartImgDesk2x from "../../assets/images/welcome-desk-2x.png";


const Welcome = () => {
  return (
    <div className={styles.welcomeBg}>
      <picture>
        <source
          media="(max-width: 375px)"
          srcSet={`${StartImgMob1x} 1x, ${StartImgMob2x} 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${StartImgTab1x} 1x, ${StartImgTab2x} 2x`}
        />
        <source
          media="(min-width: 1440px)"
          srcSet={`${StartImgDesk1x} 1x, ${StartImgDesk2x} 2x`}
        />
        <img
          src={StartImgMob1x}
          srcSet={`${StartImgMob1x} 1x, ${StartImgMob2x} 2x`}
          alt="User with laptop"
        />
      </picture>

      <div className={styles.logoWrap}>
        <Logo textClassName={styles.logoTextWelcome} />
      </div>

      <p>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>

      <div className={styles.authNavWrap}>
        <Link to="/auth/register" className={styles.authRegisterLink}>
          Registration
        </Link>
        <Link to="/auth/login" className={styles.authLoginLink}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Welcome;

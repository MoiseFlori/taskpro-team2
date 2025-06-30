import styles from "./Header.module.css";
import ThemeSelect from "../themes/ThemeSelect";
import Icon from "../Icon";
// import Profile from 'components/Profile/Profile';
// import { TempForLanguages } from 'components/TempForLanguages/TempForLanguages';

const Header = ({ onBurgerClick }) => {
  return (
    <header className={styles.headerSection}>
      <button
        className={styles.burgerBtn}
        onClick={onBurgerClick}
        aria-label="Open menu"
      >
        <Icon name="icon-menu" className={styles.iconBurger} />
      </button>
      <div className={styles.headerUserWrap}>
        {/* <TempForLanguages /> */}
        <ThemeSelect />
        {/* <Profile /> */}
      </div>
    </header>
  );
};

export default Header;

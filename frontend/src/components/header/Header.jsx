import styles from "./Header.module.css";
import ThemeSelect from "../themes/ThemeSelect";
import Icon from "../Icon";

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
        <ThemeSelect />
      </div>
    </header>
  );
};

export default Header;

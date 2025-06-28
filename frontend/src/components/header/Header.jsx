import styles from './Header.module.css';
import ThemeSelect from '../themes/ThemeSwitcher';
// import Profile from 'components/Profile/Profile';
// import { TempForLanguages } from 'components/TempForLanguages/TempForLanguages';

const Header = () => {
  return (
    <header className={styles.headerSection}>
      <div className={styles.headerUserWrap}>
        {/* <TempForLanguages /> */}
        <ThemeSelect />
        {/* <Profile /> */}
      </div>
    </header>
  );
};

export default Header;

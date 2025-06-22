import styles from './Logo.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

const Logo = () => (
  <div className={styles.logoWrapper}>
    <LogoIcon className={styles.logoIcon} />
    <span className={styles.logoText}>Task Pro</span>
  </div>
);

export default Logo;

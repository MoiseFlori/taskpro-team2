import styles from './Logo.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

const Logo = ({ textClassName = "" }) => (
  <div className={styles.logoWrapper}>
    <LogoIcon className={styles.logoIcon} />
    <span className={`${styles.logoText} ${textClassName}`}>Task Pro</span>
  </div>
);

export default Logo;

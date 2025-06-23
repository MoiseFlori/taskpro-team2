import styles from './Logo.module.css';
import Icon from '../Icon'; 

const Logo = ({ textClassName = "" }) => (
  <div className={styles.logoWrapper}>
    <Icon name="logo" width={32} height={32} className={styles.logoIcon} aria-label="Task Pro Logo" />
    <span className={`${styles.logoText} ${textClassName}`}>Task Pro</span>
  </div>
);

export default Logo;

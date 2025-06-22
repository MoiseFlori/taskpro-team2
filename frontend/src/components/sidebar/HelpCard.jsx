import styles from './Sidebar.module.css';
import cactus from '../../assets/cactus.png';
import { ReactComponent as HelpIcon } from '../../assets/help.svg'; 

const HelpCard = ({ onClick }) => {
  return (
    <div className={styles.helpCard}>
      <img src={cactus} alt="Need help" />
      <p>
        If you need help with TaskPro, check out our support resources or reach out to our customer support team.
      </p>
      <button onClick={onClick} className={styles.helpBtn}>
        <HelpIcon className={styles.helpIcon} />
        Need help?
      </button>
    </div>
  );
};

export default HelpCard;

import styles from './Sidebar.module.css';
import cactus1x from '../../assets/images/sidebar-cactus-1x.png';
import cactus2x from '../../assets/images/sidebar-cactus-2x.png';
import Icon from '../Icon';

const HelpCard = ({ onClick }) => {
  return (
    <div className={styles.helpCard}>
      <img
        src={cactus1x}
        srcSet={`${cactus1x} 1x, ${cactus2x} 2x`}
        alt="Need help"
      />
      <p>
        If you need help with TaskPro, check out our support resources or reach out to our customer support team.
      </p>
      <button onClick={onClick} className={styles.helpBtn}>
        <Icon name="help" width={20} height={20} className={styles.helpIcon} />
        Need help?
      </button>
    </div>
  );
};

export default HelpCard;

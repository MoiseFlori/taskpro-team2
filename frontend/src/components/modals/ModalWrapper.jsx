import styles from './Modal.module.css';
import { ReactComponent as CloseIcon } from '../../assets/x-close.svg'; // Or × as fallback

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;

import styles from './Modal.module.css';
import Icon from '../Icon';

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <Icon name="x-close" width={18} height={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;

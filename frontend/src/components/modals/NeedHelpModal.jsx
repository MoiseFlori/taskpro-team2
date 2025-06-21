import styles from './Modal.module.css';
import { ReactComponent as CloseIcon } from '../../assets/x-close.svg';
import ModalWrapper from './ModalWrapper';

const NeedHelpModal = ({ onClose }) => {
  return (
    <ModalWrapper>
      <button className={styles.closeBtn} onClick={onClose}>
        <CloseIcon />
      </button>

      <h2 className={styles.modalTitle}>Need help</h2>

      <form>
        <input
          type="email"
          className={styles.input}
          placeholder="Email address"
          required
        />

        <textarea
          className={styles.textarea}
          placeholder="Comment"
          required
        />

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </ModalWrapper>
  );
};

export default NeedHelpModal;

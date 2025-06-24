import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from './ModalWrapper';
import styles from './Modal.module.css';

import { sendHelpRequest } from '../../redux/help/helpThunk';
import { selectHelpLoading, selectHelpError } from '../../redux/help/helpSelector';

const NeedHelpModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(selectHelpLoading);
  const error = useSelector(selectHelpError);
  const [success, setSuccess] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendHelpRequest({ email, comment }));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000); // show the message for 2 seconds
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className={styles.modalTitle}>Need help</h2>
      {success ? (
      <div className={styles.successMessage}>
        Help request sent! We’ll get back to you soon.
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <textarea
          className={styles.textarea}
          placeholder="Comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />

<button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    )}
  </ModalWrapper>
);
};

export default NeedHelpModal;

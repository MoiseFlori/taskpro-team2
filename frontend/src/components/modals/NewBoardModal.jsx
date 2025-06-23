import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from './ModalWrapper';
import Icon from '../Icon';
import styles from './Modal.module.css';

import { createBoardThunk } from '../../redux/boards/boardsSlice';
import { selectBoardsLoading, selectBoardsError } from '../../redux/boards/boardsSelector';

const BOARD_ICONS = [
  'circles', 'star', 'loading', 'puzzle', 'container',
  'lightning', 'colors', 'hexagon'
];

// Backgrounds as imported images
import bg1 from '../../assets/boardOptions/backgrounds/bg-1.jpg';
import bg2 from '../../assets/boardOptions/backgrounds/bg-2.jpg';
import bg3 from '../../assets/boardOptions/backgrounds/bg-3.jpg';
import bg4 from '../../assets/boardOptions/backgrounds/bg-4.jpg';
import bg5 from '../../assets/boardOptions/backgrounds/bg-5.jpg';
import bg6 from '../../assets/boardOptions/backgrounds/bg-6.jpg';
import bg7 from '../../assets/boardOptions/backgrounds/bg-7.jpg';
import bg8 from '../../assets/boardOptions/backgrounds/bg-8.jpg';
import bg9 from '../../assets/boardOptions/backgrounds/bg-9.jpg';
import bg10 from '../../assets/boardOptions/backgrounds/bg-10.jpg';
import bg11 from '../../assets/boardOptions/backgrounds/bg-11.jpg';
import bg12 from '../../assets/boardOptions/backgrounds/bg-12.jpg';
import bg13 from '../../assets/boardOptions/backgrounds/bg-13.jpg';
import bg14 from '../../assets/boardOptions/backgrounds/bg-14.jpg';
import bg15 from '../../assets/boardOptions/backgrounds/bg-15.jpg';

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15];

const NewBoardModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(BOARD_ICONS[0]);
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const dispatch = useDispatch();
  const loading = useSelector(selectBoardsLoading);
  const error = useSelector(selectBoardsError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createBoardThunk({
      title,
      icon: selectedIcon,
      background: selectedBg,
    }));
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className={styles.modalTitle}>New board</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <p className={styles.sectionLabel}>Icons</p>
        <div className={styles.iconList}>
          {BOARD_ICONS.map(iconName => (
            <button
              type="button"
              key={iconName}
              onClick={() => setSelectedIcon(iconName)}
              className={`${styles.iconOption} ${selectedIcon === iconName ? styles.selected : ''}`}
              aria-label={`Select ${iconName} icon`}
            >
              <Icon name={iconName} width={24} height={24} />
            </button>
          ))}
        </div>

        <p className={styles.sectionLabel}>Background</p>
        <div className={styles.backgroundList}>
          {backgrounds.map((bg, idx) => (
            <img
              key={idx}
              src={bg}
              alt={`background-${idx}`}
              onClick={() => setSelectedBg(bg)}
              className={`${styles.bgOption} ${selectedBg === bg ? styles.selected : ''}`}
            />
          ))}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          <span className={styles.plusBtn}>+</span> {loading ? "Saving..." : "Create"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </ModalWrapper>
  );
};

export default NewBoardModal;

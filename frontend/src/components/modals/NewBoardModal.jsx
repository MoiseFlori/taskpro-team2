import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import styles from './Modal.module.css';

import circles from '../../assets/boardOptions/icons/circles.svg';
import star from '../../assets/boardOptions/icons/star.svg';
import loading from '../../assets/boardOptions/icons/loading.svg';
import puzzle from '../../assets/boardOptions/icons/puzzle.svg';
import container from '../../assets/boardOptions/icons/container.svg';
import lightning from '../../assets/boardOptions/icons/lightning.svg';
import colors from '../../assets/boardOptions/icons/colors.svg';
import hexagon from '../../assets/boardOptions/icons/hexagon.svg';

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


const icons = [circles, colors, container, hexagon, lightning, loading, puzzle, star];
const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15];

const NewBoardModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBg, setSelectedBg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBoard = {
      title,
      icon: selectedIcon,
      background: selectedBg,
    };

    console.log('Create new board:', newBoard);
    // Call onCreate handler later
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
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <p className={styles.sectionLabel}>Icons</p>
        <div className={styles.iconList}>
          {icons.map((icon, idx) => (
            <img
              key={idx}
              src={icon}
              alt={`icon-${idx}`}
              onClick={() => setSelectedIcon(icon)}
              className={`${styles.iconOption} ${selectedIcon === icon ? styles.selected : ''}`}
            />
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

        <button type="submit" className={styles.submitBtn}>
          <span className={styles.plusBtn}>+</span> Create
        </button>
      </form>
    </ModalWrapper>
  );
};

export default NewBoardModal;

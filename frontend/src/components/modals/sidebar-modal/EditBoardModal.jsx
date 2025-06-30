import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editBoardThunk } from "../../../redux/boards/boardsSlice";
import ModalWrapper from "../ModalWrapper";
import Icon from "../../Icon";
import styles from "../Modal.module.css";

const BOARD_ICONS = [
  "circles",
  "star",
  "loading",
  "puzzle",
  "container",
  "lightning",
  "colors",
  "hexagon",
];

import bg1 from "../../../assets/boardOptions/backgrounds/bg-1.jpg";
import bg2 from "../../../assets/boardOptions/backgrounds/bg-2.jpg";
import bg3 from "../../../assets/boardOptions/backgrounds/bg-3.jpg";
import bg4 from "../../../assets/boardOptions/backgrounds/bg-4.jpg";
import bg5 from "../../../assets/boardOptions/backgrounds/bg-5.jpg";
import bg6 from "../../../assets/boardOptions/backgrounds/bg-6.jpg";
import bg7 from "../../../assets/boardOptions/backgrounds/bg-7.jpg";
import bg8 from "../../../assets/boardOptions/backgrounds/bg-8.jpg";
import bg9 from "../../../assets/boardOptions/backgrounds/bg-9.jpg";
import bg10 from "../../../assets/boardOptions/backgrounds/bg-10.jpg";
import bg11 from "../../../assets/boardOptions/backgrounds/bg-11.jpg";
import bg12 from "../../../assets/boardOptions/backgrounds/bg-12.jpg";
import bg13 from "../../../assets/boardOptions/backgrounds/bg-13.jpg";
import bg14 from "../../../assets/boardOptions/backgrounds/bg-14.jpg";
import bg15 from "../../../assets/boardOptions/backgrounds/bg-15.jpg";

const backgrounds = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
  bg13,
  bg14,
  bg15,
];

const EditBoardModal = ({ onClose, board }) => {
  const dispatch = useDispatch(); // 1.
  const [title, setTitle] = useState(board?.title || "");
  const [selectedIcon, setSelectedIcon] = useState(board?.icon || null);
  const [selectedBg, setSelectedBg] = useState(board?.background || null);

  useEffect(() => {
    setTitle(board?.title || "");
    setSelectedIcon(board?.icon || null);
    setSelectedBg(board?.background || null);
  }, [board]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!board?._id) return; // safety

    const updates = {
      title,
      icon: selectedIcon,
      background: selectedBg,
    };

    // 3. Dispatch the thunk
    await dispatch(editBoardThunk({ id: board._id, data: updates })).unwrap();
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className={styles.modalTitle}>Edit board</h2>
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
          {BOARD_ICONS.map((iconName) => (
            <button
              type="button"
              key={iconName}
              onClick={() => setSelectedIcon(iconName)}
              className={`${styles.iconOption} ${
                selectedIcon === iconName ? styles.selected : ""
              }`}
              aria-label={`Select ${iconName} icon`}
              tabIndex={0}
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
              className={`${styles.bgOption} ${
                selectedBg === bg ? styles.selected : ""
              }`}
              tabIndex={0}
            />
          ))}
        </div>

        <button type="submit" className={styles.submitBtn}>
          <span className={styles.plusBtn}>+</span> Edit
        </button>
      </form>
    </ModalWrapper>
  );
};

export default EditBoardModal;

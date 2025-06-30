import Icon from "../../Icon";
import styles from "./FilterModal.module.css";
import stylesModal from "../Modal.module.css";
import ModalWrapper from "../ModalWrapper";

const PRIORITIES = [
  { value: "gray", label: "Without priority", dotClass: styles.priorityGray },
  { value: "blue", label: "Low", dotClass: styles.priorityBlue },
  { value: "pink", label: "Medium", dotClass: styles.priorityPink },
  { value: "green", label: "High", dotClass: styles.priorityGreen },
];

const FilterModal = ({
  open,
  onClose,
  selectedPriority,
  onChangePriority,
  onShowAll,
}) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalWrapper onClose={onClose} onClick={handleBackdropClick}>
      <h3 className={styles.modalTitle}>Filters</h3>
      <hr className={styles.filterDivider} />

      <div className={styles.filterHeader}>
        <span className={styles.filterLabel}>Label color</span>
        <button className={styles.showAllBtn} onClick={onShowAll} type="button">
          Show all
        </button>
      </div>

      <div className={styles.priorityList}>
        {PRIORITIES.map(({ value, label, dotClass }) => (
          <label key={value} className={styles.priorityOption}>
            <input
              type="radio"
              name="priority"
              value={value}
              checked={selectedPriority === value}
              onChange={() => {
                onChangePriority(value);
                onClose(); // închide după selectare
              }}
              className={styles.priorityRadio}
            />
            <span className={`${styles.priorityDot} ${dotClass}`} />
            {label}
          </label>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default FilterModal;

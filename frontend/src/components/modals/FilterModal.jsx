import styles from "./Modal.module.css";
import Icon from "../Icon";

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

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="x-close" width={20} height={20} />
        </button>
        <h3 className={styles.modalTitle}>Filters</h3>
        <hr className={styles.filterDivider} />
        <div className={styles.filterHeader}>
          <span className={styles.filterLabel}>Label color</span>
          <button
            className={styles.showAllBtn}
            onClick={onShowAll}
            type="button"
          >
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
                onChange={() => onChangePriority(value)}
                className={styles.priorityRadio}
              />
              <span className={`${styles.priorityDot} ${dotClass}`} />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

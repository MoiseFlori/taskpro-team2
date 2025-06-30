import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./ColumnModal.module.css";

import {
  addColumnThunk,
  editColumnThunk,
} from "../../../redux/columns/columnsSlice";
import Icon from "../../Icon";

const ColumnModal = ({ isOpen, onClose, columnData, boardId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const isEdit = Boolean(columnData);

  useEffect(() => {
    if (columnData) {
      setTitle(columnData.title);
    } else {
      setTitle("");
    }
  }, [columnData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (isEdit) {
      dispatch(editColumnThunk({ id: columnData._id, title: trimmedTitle }));
    } else {
      dispatch(addColumnThunk({ title: trimmedTitle, boardId }));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon
            name="x-close"
            width={18}
            height={18}
            className={styles.closeIcon}
          />
        </button>

        <h2 className={styles.modalTitle}>
          {isEdit ? "Edit column" : "Add column"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            <Icon name="plus" width={28} height={28} className={styles.plusIcon} />
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColumnModal;

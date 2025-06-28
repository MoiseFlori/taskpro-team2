import styles from "./Sidebar.module.css";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { deleteBoardThunk } from "../../redux/boards/boardsSlice";


const BoardItem = ({ board, onOpenModal, isActive, onSelectBoard }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteBoardThunk(board._id));
  };

  return (
    <li
      className={`${styles.boardItem} ${isActive ? styles.active : ""}`}
      onClick={() => {
        onSelectBoard(board); 
      }}
    >
      <span className={styles.iconWrap}>
        <Icon name={board.icon} width={20} height={20} />
      </span>
      <span className={styles.boardTitle}>{board.title}</span>
      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal("editBoard", board);
          }}
          aria-label="Edit board"
        >
          <Icon name="edit" width={16} height={16} />
        </button>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          aria-label="Delete board"
        >
          <Icon name="delete" width={16} height={16} />
        </button>
      </div>
    </li>
  );
};

export default BoardItem;

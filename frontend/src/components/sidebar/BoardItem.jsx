import styles from './Sidebar.module.css';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/delete.svg';

const BoardItem = ({ board, onOpenModal }) => {
  return (
    <li className={styles.boardItem}>
      <span>{board.icon} {board.title}</span>
      <div className={styles.actions}>
        <button onClick={() => onOpenModal('editBoard', board)}><EditIcon /></button>
        <button><TrashIcon /></button>
      </div>
    </li>
  );
};

export default BoardItem;

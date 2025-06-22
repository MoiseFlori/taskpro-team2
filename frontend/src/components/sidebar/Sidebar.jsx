import styles from './Sidebar.module.css';
import BoardItem from './BoardItem';
import HelpCard from './HelpCard';
import Icon from '../Icon'; 

const Sidebar = ({ onOpenModal, boards = [] }) => {
  return (
    <aside className={styles.sidebar}>
     <div className={styles.logoWrap}>
  <Icon
    name="logo"
    width={32}
    height={32}
    className={styles.logoIcon}
    aria-label="Task Pro Logo"
  />
  <span className={styles.logoText}>Task Pro</span>
</div>
      <p className={styles.sectionLabel}>My boards</p>

      <div className={styles.createBoardWrapper}>
        <span className={styles.createBoardText}>Create a new board</span>
        <button
          className={styles.plusButton}
          onClick={() => onOpenModal('newBoard')}
          aria-label="Create a new board"
        >
          <Icon name="plus" width={20} height={20} className={styles.plusIcon} />
        </button>
      </div>

      <ul className={styles.boardList}>
        {boards.map(board => (
          <BoardItem key={board.id} board={board} onOpenModal={onOpenModal} />
        ))}
      </ul>

      <HelpCard onClick={() => onOpenModal('help')} />

      <button className={styles.logoutBtn}>
        <Icon name="logout" width={32} height={32} className={styles.logoutIcon} />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

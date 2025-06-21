import styles from './Sidebar.module.css';
import BoardItem from './BoardItem';
import HelpCard from './HelpCard';
import Logo from '../Logo/Logo';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';


const Sidebar = ({ onOpenModal, boards = [] }) => {
  return (
    <aside className={styles.sidebar}>
      <Logo />

      <p className={styles.sectionLabel}>My boards</p>

      <div className={styles.createBoardWrapper}>
  <span className={styles.createBoardText}>Create a new board</span>
  <button className={styles.plusButton} onClick={() => onOpenModal('newBoard')}>
    <PlusIcon className={styles.plusIcon} />
  </button>
</div>

      <ul className={styles.boardList}>
        {boards.map(board => (
          <BoardItem key={board.id} board={board} onOpenModal={onOpenModal} />
        ))}
      </ul>

      <HelpCard onClick={() => onOpenModal('help')} />

      <button className={styles.logoutBtn}>
        <LogoutIcon className={styles.logoutIcon} />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

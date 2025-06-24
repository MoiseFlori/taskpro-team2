import styles from "./Sidebar.module.css";
import BoardItem from "./BoardItem";
import HelpCard from "./HelpCard";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/authThunk";

const Sidebar = ({
  isOpen = true, // default to always open for desktop, controlled for mobile
  onClose,       // function to close the sidebar
  onOpenModal,
  boards = [],
  selectedBoardId,
  onSelectBoard,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logoWrap}>
        <Icon
          name="logo"
          width={32}
          height={32}
          className={styles.logoIcon}
          aria-label="Task Pro Logo"
        />
        <span className={styles.logoText}>Task Pro</span>
        <button
    className={styles.closeBtn}
    onClick={onClose}
    aria-label="Close sidebar"
  >
    <Icon name="x-close" width={24} height={24} />
  </button>
      </div>

      <div className={styles.sidebarContent}>
        <p className={styles.sectionLabel}>My boards</p>

        <div className={styles.createBoardWrapper}>
          <span className={styles.createBoardText}>Create a new board</span>
          <button
            className={styles.plusButton}
            onClick={() => onOpenModal("newBoard")}
            aria-label="Create a new board"
          >
            <Icon
              name="plus"
              width={20}
              height={20}
              className={styles.plusIcon}
            />
          </button>
        </div>

        <div className={styles.boardListWrapper}>
          <ul className={styles.boardList}>
            {boards.map((board) => (
              <BoardItem
                key={board._id}
                board={board}
                onOpenModal={onOpenModal}
                isActive={selectedBoardId === board._id}
                onClick={() => onSelectBoard(board._id)}
              />
            ))}
          </ul>
        </div>

        <HelpCard onClick={() => onOpenModal("help")} />
      </div>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <Icon
          name="logout"
          width={32}
          height={32}
          className={styles.logoutIcon}
        />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

import SidebarContainer from "../components/sidebar/SidebarContainer";
import NewBoardModal from "../components/modals/sidebar-modal/NewBoardModal";
import EditBoardModal from "../components/modals/sidebar-modal/EditBoardModal";
import NeedHelpModal from "../components/modals/sidebar-modal/NeedHelpModal";
import AddCardModal from "../components/modals/cards/AddCardModal";
import EditCardModal from "../components/modals/cards/EditCardModal";
import styles from "./HomeLayout.module.css";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "../components/header/Header";
import Dashboard from "../components/dashboard/Dashboard";

const HomeLayout = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openModal = (type, board = null) => {
    setActiveModal(type);
    setActiveBoard(board);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveBoard(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.homeLayout}>
        <SidebarContainer
          onOpenModal={openModal}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        <AddCardModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <EditCardModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {activeModal === "newBoard" && <NewBoardModal onClose={closeModal} />}
        {activeModal === "editBoard" && (
          <EditBoardModal board={activeBoard} onClose={closeModal} />
        )}
        {activeModal === "help" && <NeedHelpModal onClose={closeModal} />}

        <main className={styles.homeContent}>
          <Header onBurgerClick={openSidebar} />

          <Dashboard />
        </main>
      </div>
    </LocalizationProvider>
  );
};

export default HomeLayout;

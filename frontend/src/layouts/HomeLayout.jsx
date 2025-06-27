import { Outlet } from "react-router-dom";
import SidebarContainer from "../components/sidebar/SidebarContainer";
import NewBoardModal from "../components/modals/NewBoardModal";
import EditBoardModal from "../components/modals/EditBoardModal";
import NeedHelpModal from "../components/modals/NeedHelpModal";
import AddCardModal from "../components/modals/cards/AddCardModal";
import EditCardModal from "../components/modals/cards/EditCardModal";
import styles from "./HomeLayout.module.css";
import CardDashboard from "../components/dashboard/cards/CardDashboard";
import { useState } from "react";
import Header from "../components/header/Header";
import Dashboard from "../components/dashboard/Dashboard";

const HomeLayout = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (type, board = null) => {
    setActiveModal(type);
    setActiveBoard(board);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveBoard(null);
  };

  return (
    <div className={styles.homeLayout}>
      <SidebarContainer onOpenModal={openModal} />
      <AddCardModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <EditCardModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {activeModal === "newBoard" && <NewBoardModal onClose={closeModal} />}
      {activeModal === "editBoard" && (
        <EditBoardModal board={activeBoard} onClose={closeModal} />
      )}
      {activeModal === "help" && <NeedHelpModal onClose={closeModal} />}

      <main className={styles.homeContent}>
        <Header />

        <Dashboard />
      </main>
    </div>
  );
};

export default HomeLayout;

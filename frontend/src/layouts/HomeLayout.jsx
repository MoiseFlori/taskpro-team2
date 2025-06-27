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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "../components/header/Header";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

          {/* aici vine componenta cu coloanele to do/in progress/done */}

          <CardDashboard />
        </main>
      </div>
    </LocalizationProvider>
  );
};

export default HomeLayout;

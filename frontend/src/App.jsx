import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "./components/sidebar/Sidebar";
import NewBoardModal from "./components/modals/NewBoardModal";
import EditBoardModal from "./components/modals/EditBoardModal";
import NeedHelpModal from "./components/modals/NeedHelpModal";
import WelcomePage from "./pages/WelcomePage";
import CardDashboard from "./components/dashboard/cards/CardDashboard";
import AddCardModal from "./components/modals/cards/AddCardModal";

import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyFail from "./pages/VerifyFail";

function App() {
  const [isLoggedIn] = useState(true); // sau false pentru test
  const [activeModal, setActiveModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-fail" element={<VerifyFail />} />

        {/* >>> DEV ONLY: Sidebar test route (no login needed) <<< */}
        <Route
          path="/sidebar-test"
          element={
            <>
              <Sidebar onOpenModal={openModal} />
              {activeModal === "newBoard" && (
                <NewBoardModal onClose={closeModal} />
              )}
              {activeModal === "editBoard" && (
                <EditBoardModal onClose={closeModal} />
              )}
              {activeModal === "help" && <NeedHelpModal onClose={closeModal} />}
            </>
          }
        />

        <Route
          path="/sidebar-test/cards"
          element={
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <>
                <CardDashboard />
                <AddCardModal
                  open={modalOpen}
                  onClose={() => setModalOpen(true)}
                />
              </>
            </LocalizationProvider>
          }
        />

        {/* Normal home route, protected by login */}

        {isLoggedIn && (
          <Route
            path="/home"
            element={
              <>
                <Sidebar onOpenModal={openModal} />
                {activeModal === "newBoard" && (
                  <NewBoardModal onClose={closeModal} />
                )}
                {activeModal === "editBoard" && (
                  <EditBoardModal onClose={closeModal} />
                )}
                {activeModal === "help" && (
                  <NeedHelpModal onClose={closeModal} />
                )}
              </>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

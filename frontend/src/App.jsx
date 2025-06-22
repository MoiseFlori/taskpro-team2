import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import NewBoardModal from "./Components/Modals/NewBoardModal";
import EditBoardModal from "./Components/Modals/EditBoardModal";
import NeedHelpModal from "./Components/Modals/NeedHelpModal";
import WelcomePage from "./pages/WelcomePage";
import { useState } from "react";

function App() {
  const [isLoggedIn] = useState(true); // sau false pentru test
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

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
              {activeModal === "help" && (
                <NeedHelpModal onClose={closeModal} />
              )}
            </>
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

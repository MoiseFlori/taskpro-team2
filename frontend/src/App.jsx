import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { useState } from 'react';
import NewBoardModal from './Components/Modals/NewBoardModal';
import EditBoardModal from './Components/Modals/EditBoardModal';
import NeedHelpModal from './Components/Modals/NeedHelpModal';


function App() {
  const [isLoggedIn] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      {isLoggedIn && <Sidebar onOpenModal={openModal} />}

      {activeModal === 'newBoard' && <NewBoardModal onClose={closeModal} />}
{activeModal === 'editBoard' && <EditBoardModal onClose={closeModal} />}
{activeModal === 'help' && <NeedHelpModal onClose={closeModal} />}

    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { fetchBoardsThunk } from "../../redux/boards/boardsSlice";
import { selectBoards } from "../../redux/boards/boardsSelector";

// You can pass these in as props or handle them here as needed
const SidebarContainer = ({
  onOpenModal,
  selectedBoardId,
  onSelectBoard,
}) => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  // Control sidebar open/close for mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  // Optionally: Expose setSidebarOpen to parent/header via props for burger menu integration

  return (
    <>
      {/* Demo open button, remove when Header is implemented */}
      <button onClick={() => setSidebarOpen(true)} style={{ margin: 12 }}>
        Test burger menu
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        boards={boards}
        onOpenModal={onOpenModal}
        selectedBoardId={selectedBoardId}
        onSelectBoard={onSelectBoard}
      />
    </>
  );
};

export default SidebarContainer;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { fetchBoardsThunk } from "../../redux/boards/boardsSlice";
import { selectBoards } from "../../redux/boards/boardsSelector";

const SidebarContainer = ({
  onOpenModal,
  selectedBoardId,
  onSelectBoard,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      boards={boards}
      onOpenModal={onOpenModal}
      selectedBoardId={selectedBoardId}
      onSelectBoard={onSelectBoard}
    />
  );
};

export default SidebarContainer;

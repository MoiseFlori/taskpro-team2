import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { fetchBoardsThunk } from "../../redux/boards/boardsSlice";
import { selectBoards } from "../../redux/boards/boardsSelector";

const SidebarContainer = ({ onOpenModal }) => {
   
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  return <Sidebar boards={boards} onOpenModal={onOpenModal} />;
};

export default SidebarContainer;

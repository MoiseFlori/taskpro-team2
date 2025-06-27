import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import Icon from "../Icon";

import {
  fetchColumnsThunk,
  deleteColumnThunk,
} from "../../redux/columns/columnsSlice";
import CardDashboard from "./cards/CardDashboard";
import ColumnModal from "./columns/ColumnModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) => state.selectedBoard);
  const columns = useSelector((state) => state.columns.items);
  const isLoading = useSelector((state) => state.columns.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editColumnData, setEditColumnData] = useState(null);

  // Fetch columns when board changes
  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchColumnsThunk(selectedBoard._id));
    }
  }, [selectedBoard, dispatch]);

  const openAddModal = () => {
    setEditColumnData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (column) => {
    setEditColumnData(column);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteColumnThunk(id));
  };

  return (
    <div className={styles.mainContainer}>
      {selectedBoard ? (
        <>
          <h2 className={styles.dashboardTitle}>
            {selectedBoard.title}
            {columns.length > 0 && (
              <Icon
                name="plus"
                width={28}
                height={28}
                className={styles.plusIcon}
                onClick={openAddModal}
                role="button"
                aria-label="Add column"
              />
            )}
          </h2>

          {columns.length === 0 && (
            <button className={styles.addColumnButton} onClick={openAddModal}>
              <Icon
                name="plus"
                width={28}
                height={28}
                className={styles.plusIcon}
              />
              <span className={styles.addText}>Add another column</span>
            </button>
          )}

          {isLoading ? (
            <p>Loading columns...</p>
          ) : (
            <div className={styles.columnsContainer}>
              {columns.map((column) => (
                <div key={column._id} className={styles.columnCard}>
                  <div className={styles.columnHeader}>
                    <span className={styles.columnTitle}>{column.title}</span>
                    <div className={styles.columnActions}>
                      <button
                        onClick={() => openEditModal(column)}
                        aria-label="Edit column"
                        className={styles.iconBtn}
                      >
                        <Icon name="edit" width={16} height={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(column._id)}
                        aria-label="Delete column"
                        className={styles.iconBtn}
                      >
                        <Icon name="delete" width={16} height={16} />
                      </button>
                    </div>
                  </div>
                  <CardDashboard columnId={column._id} />
                </div>
              ))}
            </div>
          )}

          {isModalOpen && (
            <ColumnModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              columnData={editColumnData}
              boardId={selectedBoard._id}
            />
          )}
        </>
      ) : (
        <p className={styles.introText}>
          Before starting your project, it is essential to create a board to
          visualize and track all the necessary tasks and milestones. This board
          serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
          <span className="highlight">create a board</span>...
        </p>
      )}
    </div>
  );
};

export default Dashboard;

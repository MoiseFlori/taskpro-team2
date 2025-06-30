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
import FilterModal from "../modals/filter/FilterModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedBoard = useSelector((state) => state.selectedBoard);
  const columns = useSelector((state) => state.columns.items);
  const isLoading = useSelector((state) => state.columns.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editColumnData, setEditColumnData] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

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

  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
  };

  const handleShowAll = () => {
    setSelectedPriority("");
  };

  return (
    <div className={styles.mainContainer}>
      {selectedBoard ? (
        <>
          <div className={styles.dashboardHeader}>
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

            <div
              className={styles.filterWrapper}
              onClick={toggleFilterModal}
              role="button"
              tabIndex={0}
              aria-label="Open filter modal"
              onKeyDown={(e) => e.key === "Enter" && toggleFilterModal()}
            >
              <Icon name="icon-filter" className={styles.filterIcon} />
              <span className={styles.filterText}>Filters</span>
            </div>
          </div>

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
                  <CardDashboard
                    columnId={column._id}
                    selectedPriority={selectedPriority}
                  />
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

          {isFilterOpen && (
            <FilterModal
              open={isFilterOpen}
              onClose={toggleFilterModal}
              selectedPriority={selectedPriority}
              onChangePriority={handlePriorityChange}
              onShowAll={handleShowAll}
            />
          )}
        </>
      ) : (
        <div className={styles.textContainer}>
          <p className={styles.introText}>
            Before starting your project, it is essential{" "}
            <span className={styles.highlight}> to create a board</span> to
            visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

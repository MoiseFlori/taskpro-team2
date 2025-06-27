import React, { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../../redux/cards/cardsSlice";
import { toast } from "react-toastify";
import Icon from "../../Icon";
import styles from "./TaskCard.module.css";
// import { deleteCard } from "../../api/cardAPI";
import EditCardModal from "../../modals/cards/EditCardModal";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TaskCard = ({
  id,
  title,
  description,
  priority = "gray",
  deadline,
  onUpdate
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const cardData = { _id: id, title, description, priority, deadline };

  const formattedDate = dayjs(deadline).format("MM/DD/YYYY");

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteCard(id)).unwrap();
      toast.success("✅ Card deleted successfully!");
      onUpdate?.();
    } catch (err) {
      console.error("Error at deleting:", err);
      toast.error("❌ Deleting failed. Check the token or the server.");
    }
  };

  // const handleDelete = async () => {
  //   await deleteCard(id);
  //   console.log("Card deleted:", id);
  //   window.location.reload();
  // };

  const handleEdit = async () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleRedirect = async () => {};

  const isTodayDeadline = dayjs().isSame(dayjs(deadline), "day");

  return (
    <div className={`${styles.taskCard} ${styles[`priority-${priority}`]}`}>
      <div className={styles.priorityStripe} />
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDescription}>{description}</p>
        <p className={styles.horizontalLine}></p>
        <div className={styles.cardFooter}>
          <div className={styles.metaInfo}>
            <div className={`${styles.priorityLabel} ${styles.gapColumn}`}>
              <p className={styles.priorityTitle}>Priority</p>
              <div className={styles.priorityValue}>
                <span className={styles.cardPriority}></span>
                <span>
                  {priority === "blue" && "Low"}
                  {priority === "pink" && "Medium"}
                  {priority === "green" && "High"}
                  {priority === "gray" && "Without"}
                </span>
              </div>
            </div>

            <div className={`${styles.priorityLabel} ${styles.rightMargin}`}>
              <p className={styles.priorityTitle}>Deadline</p>
              <p className={styles.priorityValue}>{formattedDate}</p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button onClick={handleRedirect}>
              <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                {isTodayDeadline && (
                  <Icon
                    name="bell"
                    width={14}
                    height={16}
                    className={styles.bellIcon}
                  />
                )}
              </Box>
            </button>
            <button onClick={handleRedirect}>
              <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                <Icon name="icon-redirect" width={16} height={16} />
              </Box>
            </button>
            <button onClick={handleEdit}>
              <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                <Icon name="edit" width={16} height={16} />
              </Box>
            </button>
            <button onClick={handleDelete}>
              <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                <Icon name="delete" width={16} height={16} />
              </Box>
            </button>
            {isEditModalOpen && (
              <>
                <EditCardModal
                  open={isEditModalOpen}
                  onClose={handleCloseEditModal}
                  cardData={cardData}
                  onUpdate={onUpdate}
                />
                {/* <ToastContainer position="top-right" autoClose={3000} /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

// dayjs(deadline).utc().format("MM/DD/YYYY");

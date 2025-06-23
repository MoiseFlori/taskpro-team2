import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Icon from "../../Icon";
import styles from "./TaskCard.module.css";
import { deleteCard, getCards } from "../../api/cardAPI";

const TaskCard = ({
  id,
  title,
  description,
  priority = "gray",
  deadline,
}) => {
  const formattedDate = dayjs(deadline).format("MM/DD/YYYY");

  const handleDelete = async () => {
    await deleteCard(id);
    console.log("Card deleted:", id);
    window.location.reload();
    // getCards();
  };

  const handleEdit = async () => {};

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
                {
                  isTodayDeadline && (<Icon name="bell" width={14} height={16} stroke="#BEDBB0" />)
                }
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
              {/* 🗑️ */}
              <Box sx={{ alignSelf: "flex-end", cursor: "pointer" }}>
                <Icon name="delete" width={16} height={16} />
              </Box>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

// dayjs(deadline).utc().format("MM/DD/YYYY");

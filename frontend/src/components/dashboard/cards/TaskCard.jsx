import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Icon from "../../Icon";
import "./TaskCard.module.css";
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

  return (
    <div className={`task-card priority-${priority}`}>
      <div className="priority-stripe" />
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
        <p className="card-deadline">Deadline: {formattedDate}</p>
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
  );
};

export default TaskCard;

// dayjs(deadline).utc().format("MM/DD/YYYY");

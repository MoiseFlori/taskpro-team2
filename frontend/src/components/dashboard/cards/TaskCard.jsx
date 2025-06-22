import React from "react";
import dayjs from "dayjs";
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

  return (
    <div className={`task-card priority-${priority}`}>
      <div className="priority-stripe" />
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
        <p className="card-deadline">Deadline: {formattedDate}</p>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskCard;

// dayjs(deadline).utc().format("MM/DD/YYYY");

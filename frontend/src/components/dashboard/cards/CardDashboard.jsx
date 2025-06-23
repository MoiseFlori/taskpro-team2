import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCardModal from "../../modals/cards/AddCardModal";
import TaskCard from "./TaskCard";
import { getCards } from "../../api/cardAPI";
import styles from "./CardDashboard.module.css";
import style from "../../modals/Modal.module.css";


const CardDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    const data = await getCards();
    setCards(data);
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div>
      <div className={styles.cardListWrapper}>
        <div className={styles.cardList}>
          {cards.map((card) => (
            <TaskCard
              key={card._id}
              id={card._id}
              title={card.title}
              description={card.description}
              priority={card.priority}
              deadline={card.deadline}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`${style.submitBtn} ${styles.btnPosition}`}
        onClick={() => setModalOpen(true)}
      >
        <span className={style.plusBtn}>+</span> Add
      </button>

      <AddCardModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          loadCards();
        }}
      />
    </div>
  );
};

export default CardDashboard;

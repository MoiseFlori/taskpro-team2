import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCardModal from "../../modals/cards/AddCardModal";
import TaskCard from "./TaskCard";
import { getCards } from "../../api/cardAPI";
import styles from "./CardDashboard.module.css";
import style from "../../modals/Modal.module.css";


const CardDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    return <p>You must be loged in to see the cards.</p>;
  }

  const loadCards = async () => {
    const data = await getCards();
    // window.location.reload();
    setCards(data);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    loadCards();
  }, []);

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardListWrapper}>
        <div className={styles.cardList}>
          {Array.isArray(cards) &&
            cards.map((card) => (
              <TaskCard
                key={card._id}
                id={card._id}
                title={card.title}
                description={card.description}
                priority={card.priority}
                deadline={card.deadline}
                onUpdate={loadCards}
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
      {token && <AddCardModal open={modalOpen} onClose={handleCloseModal} />};
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CardDashboard;

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCardModal from "../../modals/cards/AddCardModal";
import TaskCard from "./TaskCard";
import { getCards } from "../../api/cardAPI";
import styles from "./CardDashboard.module.css";
import style from "../../modals/Modal.module.css";

const CardDashboard = ({ columnId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <p>You must be logged in to see the cards.</p>;
  }

  const loadCards = async () => {
    const allCards = await getCards();
    const filtered = allCards.filter((card) => card.column === columnId);
    setCards(filtered);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    loadCards();
  }, [columnId]);

  useEffect(() => {
    loadCards();
  }, [columnId]);

  return (
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

      <button
        type="submit"
        className={`${style.submitBtn} ${styles.btnPosition}`}
        onClick={handleOpenModal}
      >
        <span className={style.plusBtn}>+</span> Add
      </button>

      {token && (
        <AddCardModal
          open={modalOpen}
          onClose={handleCloseModal}
          columnId={columnId}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CardDashboard;

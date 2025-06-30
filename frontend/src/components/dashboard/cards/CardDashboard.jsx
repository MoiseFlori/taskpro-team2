import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AddCardModal from "../../modals/cards/AddCardModal";
import TaskCard from "./TaskCard";
import styles from "./CardDashboard.module.css";
import style from "../../modals/Modal.module.css";
import { fetchCards } from "../../../redux/cards/cardsSlice";

const CardDashboard = ({ columnId, selectedPriority }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const allCards = useSelector((state) => state.cards.items);

  const filteredCards = allCards.filter(
    (card) =>
      card.column === columnId &&
      (selectedPriority === "" || card.priority === selectedPriority)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchCards());
    }
  }, [dispatch, token]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    dispatch(fetchCards());
  }, [dispatch]);

  if (!token) {
    return <p>You must be logged in to see the cards.</p>;
  }

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.cardList}>
        {Array.isArray(filteredCards) &&
          filteredCards.map((card) => (
            <TaskCard
              key={card._id}
              id={card._id}
              title={card.title}
              description={card.description}
              priority={card.priority}
              deadline={card.deadline}
              columnId={columnId}
              onUpdate={() => dispatch(fetchCards())}
            />
          ))}
      </div>

      <button
        type="submit"
        className={`${style.submitBtn} ${styles.btnPosition} ${styles.addVariant}`}
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
    </div>
  );
};

export default CardDashboard;

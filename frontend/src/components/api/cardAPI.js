export const getCards = async () => {
  const res = await fetch("/api/cards");
  return await res.json();
};

export const deleteCard = async (id) => {
  const res = await fetch(`/api/cards/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const editCard = async (id, updatedCard) => {
  const res = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCard),
  });
  return res.json();
};

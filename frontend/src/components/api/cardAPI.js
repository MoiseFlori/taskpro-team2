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
  

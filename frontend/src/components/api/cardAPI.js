export const getCards = async () => {
  const res = await fetch("/api/cards");
  // if (!res.ok) {
  //   const message = await res.text(); // în loc de .json()
  //   throw new Error(`Server error: ${res.status} – ${message}`);
  // }
  return await res.json();
};

export const deleteCard = async (id) => {
  const res = await fetch(`/api/cards/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
  

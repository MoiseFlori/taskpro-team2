import axios, { setAuthToken } from "../../utils/axiosConfig";
import { getStore } from "../../utils/storeRef";

export const getCards = async () => {
  const token = getStore().getState().auth.token;
  setAuthToken(token);

  const res = await axios.get("/api/cards", { withCredentials: true });
  return res.data;
  // const token = localStorage.getItem("token");
  // const res = await fetch("/api/cards", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include", // send all cookies
  // });
  // return await res.json();
};

export const deleteCard = async (id) => {
  const token = getStore().getState().auth.token;
  setAuthToken(token);

  const res = await axios.delete(`/api/cards/${id}`, { withCredentials: true });
  return res.data;
  // const token = localStorage.getItem("token");
  // const res = await fetch(`/api/cards/${id}`, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  // });
  // return res.json();
};

export const editCard = async (id, updatedCard) => {
  const token = getStore().getState().auth.token;
  setAuthToken(token);

  const res = await axios.patch(`/api/cards/${id}`, updatedCard, { withCredentials: true });
  return res.data;
  // const token = localStorage.getItem("token");
  // const res = await fetch(`/api/cards/${id}`, {
  //   method: "PATCH",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify(updatedCard),
  // });
  // return res.json();
};

// utils/storeRef.js
let store;

export const setStore = (s) => {
  store = s;
};

export const getStore = () => store;

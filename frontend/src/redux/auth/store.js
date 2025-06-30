import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import { setStore } from "../../utils/storeRef";
import selectedBoardReducer from "../boards/selectedBoardSlice";
import boardsReducer from "../boards/boardsSlice";
import columnsReducer from "../columns/columnsSlice";
import cardsReducer from "../cards/cardsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  selectedBoard: selectedBoardReducer,
  columns: columnsReducer,
  cards: cardsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "boards", "cards", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setStore(store);

export const persistor = persistStore(store);

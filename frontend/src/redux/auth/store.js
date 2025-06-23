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

import boardsReducer from "../boards/boardsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "boards"],
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

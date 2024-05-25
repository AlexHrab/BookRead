import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/slice";
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
import storage from "redux-persist/lib/storage";
import { booksReducer } from "./Books/slice";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  // whitelist: ["sid"],
};

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: persistReducer(persistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

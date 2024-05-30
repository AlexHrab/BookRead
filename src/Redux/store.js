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
import { otherReducer } from "./Other/slice";
// import { filterReducer } from "./Filter/slice";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  // whitelist: ["sid"],
};

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
    other: otherReducer,
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

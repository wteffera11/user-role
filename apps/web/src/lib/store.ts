import { configureStore } from "@reduxjs/toolkit";
import { rolesApi } from "./features/roles.api";
import { middleware } from "./middleware";

export const store = configureStore({
  reducer: {
    [rolesApi.reducerPath]: rolesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware);
  },
  // middleware: (existingmiddleware) => existingmiddleware.pu,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

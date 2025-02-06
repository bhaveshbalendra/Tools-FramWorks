import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/UserSlice"; // Correct reducer path

// Configure the store with the users reducer
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Define types for RootState and AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../features/user/usersSlice";
// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

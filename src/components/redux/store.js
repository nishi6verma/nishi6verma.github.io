import { configureStore } from "@reduxjs/toolkit";

import getTodoListsReducer from "./reducers/getTodoListsPage";

export const store = configureStore({
  reducer: {
    todoLists: getTodoListsReducer,
  },
});
import { createSlice } from "@reduxjs/toolkit";

export const getTodoListSlice = createSlice({
  name: "todoLists",
  initialState: {
    isLoading: true,
    data: [],
    isError: false,
  },
  reducers: {
    getTodoLists: (state) => {
      state.data = JSON.parse(window.localStorage.getItem("todoLists"));
    },
  },
});

export const { getTodoLists } = getTodoListSlice.actions;

export default getTodoListSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [] },
  reducers: {
    tasksLoaded(state, action) {
      state.items = action.payload;
    },
    taskAdded(state, action) {
      state.items.unshift(action.payload);
    },
    taskUpdated(state, action) {
      const index = state.items.findIndex(
        (task) => task._id === action.payload._id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    taskRemoved(state, action) {
      state.items = state.items.filter(
        (task) => task._id !== action.payload
      );
    },
    tasksCleared(state) {
      state.items = [];
    },
  },
});

export const {
  tasksLoaded,
  taskAdded,
  taskUpdated,
  taskRemoved,
  tasksCleared,
} = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.items;
export default tasksSlice.reducer;

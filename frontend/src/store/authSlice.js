import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    userSet(state, action) {
      state.user = action.payload;
    },
    userCleared(state) {
      state.user = null;
    },
  },
});

export const { userSet, userCleared } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;

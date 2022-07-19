import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: { value: initialStateValue },
  reducers: {
    get: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { get, reset } = tokenSlice.actions;

export default tokenSlice.reducer;

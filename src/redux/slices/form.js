import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  from: "",
  to: "",
  fromDate: "",
  toDate: "",
  tickets: 0,
};

export const formSlice = createSlice({
  name: "form",
  initialState: { value: initialStateValue },
  reducers: {
    search: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialStateValue;
    },
  },
});


export const {search,reset} = formSlice.actions;

export default formSlice.reducer;
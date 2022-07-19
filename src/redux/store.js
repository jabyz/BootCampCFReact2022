import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/form";
import tokenReducer from "./slices/token"

export const store = configureStore({
  reducer: {
    form: formReducer,
    token: tokenReducer,
  },
});

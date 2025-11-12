import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import invoiceReducer from "./slices/invoice-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
});

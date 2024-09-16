import { configureStore } from "@reduxjs/toolkit"
import authslice from "./authslice.jsx"


const store = configureStore({
  reducer: {
    auth: authslice,
  },
});
export default store;
